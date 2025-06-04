import compareModel from "../../models/olap/compareModel.js";

const compareController = {
  async compare(req, res) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid argument",
      });
    }

    try {
      const result = await compareModel.compare(req.body);

      res.status(200).json({
        status: "success",
        data: result.recordset || result,
      });
    } catch (error) {
      console.error("Error in compareController.compare:", error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async cross(req, res) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid argument",
      });
    }

    try {
      const result = await compareModel.cross(req.body);

      res.status(200).json({
        status: "success",
        data: result.recordset || result,
      });
    } catch (error) {
      console.error("Error in compareController.cross:", error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

export default compareController;