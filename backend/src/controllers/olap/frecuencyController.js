import frecuencyModel from "../../models/olap/frecuencyModel.js";

const frecuencyController = {
  async getFrecuency(req, res) {
    const { dim } = req.params;

    if (!dim || !dim.trim()) {
      return res.status(400).json({ error: "Dimension parameter is required" });
    }

    try {
      const data = await frecuencyModel.getFrecuency(dim);
      return res.status(200).json({
        data: data,
        status: "success",
      });
    } catch (error) {
      console.error("Error fetching frecuency data:", error);
      return res
        .status(500)
        .json({ status: "error", error: "Internal server error" });
    }
  },
};

export default frecuencyController;
