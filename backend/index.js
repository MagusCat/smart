const app = require('./src/app');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tipoCombustibleRoutes = require('./src/routes/tipo_combustible.js');
const tipoVehiculoRoutes = require('./src/routes/tipo_vehiculo.js');
const tipoPropietarioRoutes = require('./src/routes/tipo_propietario.js');
const tipoServicioRoutes = require('./src/routes/tipo_servicio.js');
const tipoUsoRoutes = require('./src/routes/tipo_uso.js');
const departamentoRoutes = require('./src/routes/departamento.js');
const inscripcionRoutes = require('./src/routes/inscripcion.js');
const marcaRoutes = require('./src/routes/marca.js');
const categoriasRoutes = require('./src/routes/categorias.js');
const vehiculoRoutes = require('./src/routes/vehiculo.js');
const propietarioRoutes = require('./src/routes/propietario.js');

const testRoutes = require('./src/routes/testRoutes.js');
const olapRoutes = require('./src/routes/olap/index.js');

app.use(express.json());
app.use(cors());

app.use('/SmartDrive/TipoCombustible', tipoCombustibleRoutes);
app.use('/SmartDrive/TipoVehiculo', tipoVehiculoRoutes);
app.use('/SmartDrive/TipoPropietario', tipoPropietarioRoutes);
app.use('/SmartDrive/TipoServicio', tipoServicioRoutes);
app.use('/SmartDrive/TipoUso', tipoUsoRoutes);
app.use('/SmartDrive/Departamento', departamentoRoutes);
app.use('/SmartDrive/Inscripcion', inscripcionRoutes);
app.use('/SmartDrive/Marca', marcaRoutes);
app.use('/SmartDrive/Categorias', categoriasRoutes);
app.use('/SmartDrive/Vehiculo', vehiculoRoutes);
app.use('/SmartDrive/Propietario', propietarioRoutes);

app.use("/api/", testRoutes);
app.use("/api/olap/", olapRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});