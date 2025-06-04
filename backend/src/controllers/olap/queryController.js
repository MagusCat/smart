import queryModel from "../../models/olap/queryModel.js";

const queryController = {
  async send(req, res) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid argument",
      });
    }

    try {
      const result = await queryModel.send(body);

      res.status(200).json({
        status: "success",
        data: result.recordset || result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

export default queryController;
