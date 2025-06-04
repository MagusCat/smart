import getConnection from "../../config/db_olap.js";

const allow_dims = {
  dim_marca: { id: "id_dim_marca", label: "Marca", field: "marca" },
  dim_categoria: {
    id: "id_dim_categoria",
    label: "Categoría",
    field: "categoria",
  },
  dim_propietario: {
    id: "id_dim_propietario",
    label: "Propietario",
    field: "propietario",
  },
  dim_tipo_combustible: {
    id: "id_dim_tipo_combustible",
    label: "Tipo de Combustible",
    field: "combustible",
  },
  dim_tipo_uso: { id: "id_dim_tipo_uso", label: "Tipo de Uso", field: "uso" },
  dim_tipo_servicio: {
    id: "id_dim_tipo_servicio",
    label: "Tipo de Servicio",
    field: "servicio",
  },
  dim_tipo_vehiculo: {
    id: "id_dim_tipo_vehiculo",
    label: "Tipo de Vehículo",
    field: "vehiculo",
  },
};

const compareModel = {
  async getCategories() {
    return Object.entries(allow_dims).map(([dim, { id, label }]) => ({
      dim,
      label,
    }));
  },

  async getTimes() {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT anio FROM dim_tiempo GROUP BY anio ORDER BY anio DESC");

    if (result.recordset.length === 0) {
      throw new Error("No time data found");
    }

    return result.recordset.map((row) => ({
      id: row.anio,
      label: row.anio.toString(),
    }));
  },

  async compare(query) {
    const { field, agg = "COUNT", filters = [], group = [] } = query;
    const pool = await getConnection();

    const buildWhere = (filters, prefix = "a") => {
      const where = [];
      const params = {};

      filters.forEach((f, i) => {
        const param = `${prefix}_f${i}`;
        where.push(`${f.field} ${f.condition} @${param}`);
        params[param] = f.value;
      });

      return {
        where: where.length ? "WHERE " + where.join(" AND ") : "",
        params,
      };
    };

    const buildQuery = (field, where, group) => {
      const selectGroupKeys = group
        .map((gField) => `${gField} as label`)
        .join(", ");
      const groupByClause = group.join(", ");
      const orderByClause = group.map((gField) => `${gField} ASC`).join(", ");

      return `
      SELECT
        ${selectGroupKeys},
        ${agg}(${allow_dims[field].field}) as value
      FROM hecho_inscripcion
      INNER JOIN dim_tiempo ON hecho_inscripcion.id_dim_tiempo = dim_tiempo.id_dim_tiempo
      INNER JOIN ${field} as dim ON hecho_inscripcion.${allow_dims[field].id} = dim.${allow_dims[field].id}
      ${where}
      GROUP BY ${groupByClause}
      ORDER BY ${orderByClause}
    `;
    };

    const results = {};

    for (const [index, filterSet] of filters.entries()) {
      const { where, params } = buildWhere(
        filterSet.conditions,
        `filter_${index}`
      );
      const req = pool.request();
      Object.entries(params).forEach(([k, v]) => req.input(k, v));

      const currentQuery = buildQuery(field, where, group);

      console.log(`Executing query for filter set ${index}:`, currentQuery);

      console.log("Parameters:", params); 
      
      const result = await req.query(currentQuery);

      results[filterSet.label || `series_${index}`] = result.recordset;
    }

    return results;
  },

  async cross(query) {
    const { colField, rowField, filters = [], field, agg } = query;
    const pool = await getConnection();

    if (
      !colField ||
      !rowField ||
      !field ||
      !agg ||
      !allow_dims[colField] ||
      !allow_dims[rowField]
    ) {
      throw new Error("Invalid query parameters");
    }

    const columnsRaw = await pool
      .request()
      .query(
        `SELECT DISTINCT ${allow_dims[colField].field} FROM ${colField} ORDER BY ${allow_dims[colField].field}`
      );

    const columnsQuery = columnsRaw.recordset
      .map((col) => `[${col[allow_dims[colField].field]}]`)
      .join(", ");

    const conditions = filters.map((filter) => {
      return `${filter.field} ${filter.condition} ${filter.value}`;
    });
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const pivot = `
            SELECT * 
            FROM (
                SELECT 
                    [rowDim].${allow_dims[rowField].field} as rowField,
                    [colDim].${allow_dims[colField].field} as colField,
                    ${field} as field
                FROM hecho_inscripcion
                INNER JOIN dim_tiempo ON hecho_inscripcion.id_dim_tiempo = dim_tiempo.id_dim_tiempo
                INNER JOIN ${colField} as colDim ON hecho_inscripcion.${
      allow_dims[colField].id
    } = [colDim].${allow_dims[colField].id}
                INNER JOIN ${rowField} as rowDim ON hecho_inscripcion.${
      allow_dims[rowField].id
    } = [rowDim].${allow_dims[rowField].id}
                ${filters.length > 0 ? whereClause : ""}
            ) as rawTable
             PIVOT (
                ${agg}(field) 
                FOR colField IN (${columnsQuery})
            ) as pivotTable`;

    const result = await pool.request().query(pivot);

    if (result.recordset.length === 0) {
      throw new Error("No data found for the given query");
    }

    return result;
  },
};

export default compareModel;
