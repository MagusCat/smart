import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const configOLTP = {
    user: process.env.DB_SQL_USER, // Usar el usuario de SQL Server
    password: process.env.DB_SQL_PWD, // Usar la contraseña de SQL Server
    server: process.env.DB_SERVER,
    database: process.env.DB_OLTP_NAME,
    options: {
        encrypt: false, // Para SQL Server local, si no usas SSL/TLS
        trustServerCertificate: true // Cambiado a true para desarrollo local
    }
};

const configOLAP = {
    user: process.env.DB_SQL_USER, // Usar el usuario de SQL Server
    password: process.env.DB_SQL_PWD, // Usar la contraseña de SQL Server
    server: process.env.DB_SERVER,
    database: process.env.DB_OLAP_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const poolOLTP = new sql.ConnectionPool(configOLTP)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos OLTP');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos OLTP:', err);
        // Salir de la aplicación si hay un error fatal en la conexión inicial
        process.exit(1); 
    });

export const poolOLAP = new sql.ConnectionPool(configOLAP)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos OLAP');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos OLAP:', err);
        // Salir de la aplicación si hay un error fatal en la conexión inicial
        process.exit(1); 
    });

export { sql };