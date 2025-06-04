import getConnectionOltp from "../config/db_oltp.js";
import getConnectionOlap  from "../config/db_olap.js";

async function  testConnection(con) {
    return await con() 
    .then(pool => {
        return true;
    }).catch(error => {
        throw error;
    })
}

const testModel = {
    async test() {
        const olap = await testConnection(getConnectionOlap);
        const oltp = await testConnection(getConnectionOltp);

        return olap && oltp;
    }
}

export default testModel;