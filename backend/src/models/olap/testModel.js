import getConnectionOlap  from "../../config/db_olap.js";


const testModel = {
    async test() {
        const olap = await getConnectionOlap()
        .then(pool => {
            return pool.request().query("SELECT db_name() as db");
        })
        .catch(error => {throw error});

        return olap;
    }
}

export default testModel;