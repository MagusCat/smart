import compareModel from "../../models/olap/compareModel.js";

const summaryCompareController = {
  async getCompareSummary(req, res) {
    try {
      const { field, filters, agg = "COUNT", group = [] } = req.body;
      if (!field || !filters || filters.length < 2) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const result = await compareModel.compare({
        field,
        filters,
        agg,
        group,
      });

      const [f1, f2] = filters;
      const total1 = result[f1.label]?.[0]?.value || 0;
      const total2 = result[f2.label]?.[0]?.value || 0;
      const diff = total2 - total1;
      const percent = total1 !== 0 ? (diff / total1) * 100 : 0;
      const trend = diff > 0 ? "up" : diff < 0 ? "down" : "equal";
      res.status(200).json({
        period1: { value: total1, label: f1.label },
        period2: { value: total2, label: f2.label },
        diff,
        percent,
        trend,
      });
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Error al obtener resumen comparativo",
          details: err.message,
        });
    }
  },
};

export default summaryCompareController;
