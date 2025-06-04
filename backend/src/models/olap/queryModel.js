import getConnection from "../../config/db_olap.js";

async function buildQuery({
  table,
  top,
  columns = [],
  dims = [],
  aggregations = [],
  conditions = [],
  order = {},
}) {
  return new Promise((resolve) => {
    if (!table) throw new Error("Invalid query parameters");

    const selectCols = columns.map(
      (col) => `[${col.name}] AS [${col.alias || col.name}]`
    );

    const joins = dims.map(
      (dim) =>
        `${(dim.type || "INNER").toUpperCase()} JOIN [${
          dim.name
        }] ON [${table}].[${dim.identify}] = [${dim.name}].[${dim.identify}]`
    );

    const groupByCols = [
      ...columns.map(
        (col) => `${col.table ? `[${col.table}].` : ""}[${col.name}]`
      ),
    ];

    const selectAggs = aggregations.flatMap((agg) =>
      agg.fields.map(
        (field) =>
          `${agg.agg}([${field.name}]) AS [${
            field.alias ? field.alias : `${agg.agg.toLowerCase()}_${field.name}`
          }]`
      )
    );

    const whereParts = conditions.map((cond) =>
      cond.fields
        .map(
          (field) =>
            `[${field}] ${cond.condition} ${
              typeof cond.value === "string" ? `'${cond.value}'` : cond.value
            }`
        )
        .join(" AND ")
    );

    const whereClause = whereParts.length
      ? `WHERE ${whereParts.join(" AND ")}`
      : "";

    const orderByClause =
      order.by && order.by.length
        ? `ORDER BY ${order.by.map((f) => `[${f}]`).join(", ")} ${
            order.type || ""
          }`.trim()
        : "";

    const selectClause = [...selectCols, ...selectAggs]
      .filter(Boolean)
      .join(", ");

    const groupByClause = groupByCols.length
      ? `GROUP BY ${groupByCols.join(", ")}`
      : "";

    const sql = `
    SELECT ${top ? `TOP ${top}` : ""} ${selectClause}
    FROM [${table}]
    ${joins.join(" ")}
    ${whereClause}
    ${groupByClause}
    ${orderByClause}
  `
      .replace(/\s+/g, " ")
      .trim();

    resolve(sql);
  });
}

const queryModel = {
    async send(query){
        const sqlQuery = await buildQuery(query);
        const result = await getConnection()
        .then(pool => {
            return pool.request().query(sqlQuery);
        }).catch(err => {throw err});

        return result;
    }
}

export default queryModel;