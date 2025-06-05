import getConnection from "../../config/db_olap.js";
import allow_dims from "../../config/allows_dims.js";

const compareModel = {
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
      let selectGroupKeys =
        group.length > 0
          ? group.map((gField) => `${gField} as label`).join(", ")
          : null;
      let groupByClause = group.length > 0 ? group.join(", ") : null;
      let orderByClause =
        group.length > 0
          ? group.map((gField) => `${gField} ASC`).join(", ")
          : null;

      return `
      SELECT
        ${selectGroupKeys ? selectGroupKeys + "," : ""}
        ${agg}(${allow_dims[field].field}) as value
      FROM hecho_inscripcion
      INNER JOIN dim_tiempo ON hecho_inscripcion.id_dim_tiempo = dim_tiempo.id_dim_tiempo
      INNER JOIN ${field} as dim ON hecho_inscripcion.${
        allow_dims[field].id
      } = dim.${allow_dims[field].id}
      ${where}
      ${groupByClause ? `GROUP BY ${groupByClause}` : ""}
      ${orderByClause ? `ORDER BY ${orderByClause}` : ""}
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
