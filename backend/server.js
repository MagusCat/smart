import 'dotenv/config'; 
import app from './src/app.js'; 
import { poolOLTP, poolOLAP } from './src/database/db.js'; 

const PORT = process.env.PORT || 3000;

async function startApp() {
    try {
        await poolOLTP;
        await poolOLAP;
        console.log('¡Conexión a las bases de datos exitosa!');

        app.listen(PORT, () => {
            console.log(`API corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error FATAL al conectar a la base de datos o iniciar el servidor:', err.message);
        process.exit(1);
    }
}


startApp();