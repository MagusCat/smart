import summaryModel from "../../models/olap/summaryModel.js";

const summaryController = {
  async getGrowthMonthly(req, res) {
    try {
      const top = parseInt(req.query.top) || 12;
      const data = await summaryModel.getGrowthMounthly(top);
      res.status(200).json(data);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error al obtener crecimiento mensual", details: err });
    }
  },

  async getGrowthQuarterly(req, res) {
    try {
      const top = parseInt(req.query.top) || 12;
      const data = await summaryModel.getGrowthQuarterly(top);
      res.status(200).json(data);
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Error al obtener crecimiento trimestral",
          details: err,
        });
    }
  },

  async getAverageMonthly(req, res) {
    try {
      const average = await summaryModel.getAverageMonthly();
      res.status(200).json({ promedio_mensual: average });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error al obtener promedio mensual", details: err });
    }
  },

  async getAverageQuarterly(req, res) {
    try {
      const average = await summaryModel.getAverageQuarterly();
      res.status(200).json({ promedio_trimestral: average });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error al obtener promedio trimestral", details: err });
    }
  },

  async getTotal(req, res) {
    try {
      const total = await summaryModel.getTotal();
      res.status(200).json({ total });
    } catch (err) {
      res.status(500).json({ error: "Error al obtener total", details: err });
    }
  },

  async getSummary(req, res) {
    try {
      const summary = await summaryModel.getSummary();
      res.status(200).json(summary);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error al obtener el resumen", details: err });
    }
  },
};

export default summaryController;
