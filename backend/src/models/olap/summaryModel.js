import getConnection from "../../config/db_olap.js";
import  allow_dims  from "../../config/allows_dims.js";

const SQL_GROWTH_MONTHLY = `
WITH per_month AS (
	SELECT 
		DATEFROMPARTS(dt.anio, dt.mes, 1) as f,
		COUNT(*) as t
	FROM HECHO_INSCRIPCION hi 
	INNER JOIN DIM_Tiempo dt 
		ON dt.Id_dim_tiempo = hi.Id_dim_tiempo
	GROUP BY dt.anio, dt.mes
),
diff_month AS (
	SELECT 
		f as fecha, COALESCE(LAG(f) OVER (ORDER BY f), f) as fecha_anterior, 
		t as total, COALESCE(LAG(t) OVER (ORDER BY f), 0) as total_anterior,
		COALESCE(
		ROUND(
			100.0 * (t - LAG(t) OVER (ORDER BY f)) / LAG(t) OVER (ORDER BY f), 2
		), 0)  as diff
	FROM per_month
)
SELECT * FROM diff_month ORDER BY fecha DESC;`;

const SQL_GROWTH_QUARTERLY = `
WITH per_quarter AS (
	SELECT 
		dt.anio as a,
		DATEPART(QUARTER, dt.fecha) as q,
		COUNT(*) as t
	FROM HECHO_INSCRIPCION hi 
	INNER JOIN DIM_Tiempo dt 
		ON dt.Id_dim_tiempo = hi.Id_dim_tiempo
	GROUP BY dt.anio, DATEPART(QUARTER, dt.fecha)
),
diff_quarter AS (
	SELECT 
		a as anio,
		q as trimestre, COALESCE(LAG(q) OVER (ORDER BY a, q), 0) as trimestre_anterior,
		t as total, COALESCE(LAG(t) OVER (ORDER BY a, q), 0) as total_anterior,
		COALESCE(
		ROUND(
			100.0 * (t - LAG(t) OVER (ORDER BY a, q)) / LAG(t) OVER (ORDER BY a, q ), 2
		), 0)  as diff
	FROM per_quarter 
)
SELECT * FROM diff_quarter ORDER BY anio DESC, trimestre DESC`;

const SQL_AVERAGE_QUARTERLY = `
WITH total_quarter AS (
  SELECT 
    YEAR(dt.fecha) AS a,
    DATEPART(QUARTER, dt.fecha) AS f,
    COUNT(*) AS t
  FROM Hecho_Inscripcion hi
  INNER JOIN Dim_tiempo dt ON dt.id_dim_tiempo = hi.id_dim_tiempo
  GROUP BY YEAR(dt.fecha), DATEPART(QUARTER, dt.fecha)
)
SELECT 
  AVG(CAST(t AS FLOAT)) AS p
FROM total_quarter`;

const SQL_AVERAGE_MONTHLY = `
WITH total_mounth AS (
  SELECT 
    dt.anio,
    dt.mes,
    COUNT(*) AS t
  FROM Hecho_Inscripcion hi
  INNER JOIN Dim_tiempo dt ON dt.id_dim_tiempo = hi.id_dim_tiempo
  GROUP BY dt.anio, dt.mes
)
SELECT 
  AVG(CAST(t AS FLOAT)) AS p
FROM total_mounth;`;

const summaryModel = {
  async getGrowthMounthly(top = 12) {
    const result = await getConnection()
      .then((pool) => {
        return pool.request().query(SQL_GROWTH_MONTHLY);
      })
      .catch((err) => {
        throw err;
      });

    return result.recordset.slice(0, top);
  },

  async getGrowthQuarterly(top = 12) {
    const result = await getConnection()
      .then((pool) => {
        return pool.request().query(SQL_GROWTH_QUARTERLY);
      })
      .catch((err) => {
        throw err;
      });

    return result.recordset.slice(0, top);
  },

  async getAverageMonthly() {
    const result = await getConnection()
      .then((pool) => {
        return pool.request().query(SQL_AVERAGE_MONTHLY);
      })
      .catch((err) => {
        throw err;
      });

    return result.recordset[0].p;
  },

  async getAverageQuarterly() {
    const result = await getConnection()
      .then((pool) => {
        return pool.request().query(SQL_AVERAGE_QUARTERLY);
      })
      .catch((err) => {
        throw err;
      });

    return result.recordset[0].p;
  },

  async getSummary() {
    const growthMonthly = await this.getGrowthMounthly(1);
    const growthQuarterly = await this.getGrowthQuarterly(1);
    const averageMonthly = await this.getAverageMonthly();
    const averageQuarterly = await this.getAverageQuarterly();
    const total = await this.getTotal();

    return {
      grow_m: growthMonthly,
      grow_q: growthQuarterly,
      avg_m: averageMonthly,
      avg_q: averageQuarterly,
      total: total,
    };
  },

  async getTotal() {
    const result = await getConnection()
      .then((pool) => {
        return pool
          .request()
          .query("SELECT COUNT(*) AS total FROM HECHO_INSCRIPCION");
      })
      .catch((err) => {
        throw err;
      });

    return result.recordset[0].total;
  },

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
};

export default summaryModel;
