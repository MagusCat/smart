import getConnection from "../../config/db_olap.js";
import allow_dims from "../../config/allows_dims.js";

const frecuencyModel = {
  async getFrecuency(dim) {
    const pool = await getConnection();

    if (!allow_dims[dim]) {
      throw new Error(`Dimension "${dim}" is not allowed.`);
    }

    const sql = `
      SELECT 
        '${allow_dims[dim].label}' as var,
        ${allow_dims[dim].field} as label, 
        COUNT(*) as total
      FROM hecho_inscripcion
      INNER JOIN ${dim} ON hecho_inscripcion.${allow_dims[dim].id} = ${dim}.${allow_dims[dim].id}
      GROUP BY ${allow_dims[dim].field}
      ORDER BY total DESC
    `;
    const result = await pool.request().query(sql);
    return result.recordset;
  },
};

export default frecuencyModel;
