import testModel from "../models/testModel.js";

const testController = {
    async test(req, res) {
        try {
            const result = await testModel.test();

            if (result) {
                res.status(200).json({ message: "Database connection successful" });
            } else {
                res.status(500).json({ message: "Database connection failed" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default testController;