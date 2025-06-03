import mssql from "mssql"

const config = {
  user: process.env.DB_OLAP_USER,
  password: process.env.DB_OLAP_PWD,
  database: process.env.DB_OLAP_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, 
    trustServerCertificate: true,
    trustedConnection: true
  }
}


function getConnection(){
    return mssql.connect(config);
}

export default getConnection;