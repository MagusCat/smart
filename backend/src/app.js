import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sql, poolOLTP, poolOLAP } from './database/db.js';
import express from "express";
import testRoutes from "./routes/testRoutes.js";
import olapRoutes from "./routes/olap/index.js"
import oltpRoutes from "./routes/oltp/index.js"

// Importar todos tus archivos de ruta
import categoriasRoutes from './routes/categorias.js';
import departamentoRoutes from './routes/departamento.js';
import inscripcionRoutes from './routes/inscripcion.js';
import marcaRoutes from './routes/marca.js';
import propietarioRoutes from './routes/propietario.js';
import testRoutes from './routes/testRoutes.js';
import tipoCombustibleRoutes from './routes/tipo_combustible.js';
import tipoPropietarioRoutes from './routes/tipo_propietario.js';
import tipoServicioRoutes from './routes/tipo_servicio.js';
import tipoUsoRoutes from './routes/tipo_uso.js';
import tipoVehiculoRoutes from './routes/tipo_vehiculo.js';
import vehiculoRoutes from './routes/vehiculo.js';

dotenv.config();

// ¡ESTA LÍNEA ES CRUCIAL Y DEBE ESTAR AQUÍ! Define la variable 'app'.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Definir las rutas base para cada conjunto de rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/propietarios', propietarioRoutes);
app.use('/api/test', testRoutes);
app.use('/api/tipocombustibles', tipoCombustibleRoutes);
app.use('/api/tipopropietarios', tipoPropietarioRoutes);
app.use('/api/tiposervicios', tipoServicioRoutes);
app.use('/api/tipousos', tipoUsoRoutes);
app.use('/api/tipovehiculos', tipoVehiculoRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        // --- INICIO DEL CAMBIO ---
        // Eliminado: await connectDB();
        // Ahora, esperamos directamente las promesas de los pools de conexión
        await poolOLTP; // Espera a que la conexión OLTP se establezca
        await poolOLAP; // Espera a que la conexión OLAP se establezca

        console.log('Conexión a las bases de datos exitosa.'); // Confirmación de conexión

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Accede a la API en: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        // Mejorar el mensaje de error para incluir detalles de la conexión a la DB
        console.error('Fallo al iniciar el servidor o conectar a la base de datos:', error);
        process.exit(1);
    }
};

iniciarServidor();

app.use("/api/", testRoutes);
app.use("/api/olap/", olapRoutes);
app.use("/api/oltp/", oltpRoutes);


// Esta línea debe estar al final del archivo y 'app' debe haber sido definida arriba.
export default app;