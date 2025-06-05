-- ETL Script to transfer data from OLTP_SMTDRV to OLAP_SMTDRV

USE [OLAP_SMTDRV]
GO

-- Step 1: Populate DIM_Categoria
PRINT 'Populating DIM_Categoria...'
INSERT INTO dbo.DIM_Categoria (categoria)
SELECT DISTINCT c.categoria
FROM OLTP_SMTDRV.dbo.Categoria c
LEFT JOIN dbo.DIM_Categoria dc ON c.categoria = dc.categoria
WHERE dc.categoria IS NULL;

-- Step 2: Populate DIM_Departamento
PRINT 'Populating DIM_Departamento...'
INSERT INTO dbo.DIM_Departamento (departamento)
SELECT DISTINCT d.departamento
FROM OLTP_SMTDRV.dbo.Departamento d
LEFT JOIN dbo.DIM_Departamento dd ON d.departamento = dd.departamento
WHERE dd.departamento IS NULL;

-- Step 3: Populate DIM_Marca
PRINT 'Populating DIM_Marca...'
INSERT INTO dbo.DIM_Marca (marca)
SELECT DISTINCT m.marca
FROM OLTP_SMTDRV.dbo.Marca m
LEFT JOIN dbo.DIM_Marca dm ON m.marca = dm.marca
WHERE dm.marca IS NULL;

-- Step 4: Populate DIM_Propietario
PRINT 'Populating DIM_Propietario...'
INSERT INTO dbo.DIM_Propietario (propietario)
SELECT DISTINCT tp.propietario
FROM OLTP_SMTDRV.dbo.Tipo_Propietario tp
LEFT JOIN dbo.DIM_Propietario dp ON tp.propietario = dp.propietario
WHERE dp.propietario IS NULL;

-- Step 5: Populate DIM_Tiempo (assuming you want to load for a specific range or incrementally)
-- For simplicity, let's load all distinct dates from the Inscripcion table.
PRINT 'Populating DIM_Tiempo...'
INSERT INTO dbo.DIM_Tiempo (dia, mes, anio, fecha)
SELECT DISTINCT
    DATEPART(day, i.fecha_emision),
    DATEPART(month, i.fecha_emision),
    DATEPART(year, i.fecha_emision),
    i.fecha_emision
FROM OLTP_SMTDRV.dbo.Inscripcion i
LEFT JOIN dbo.DIM_Tiempo dt ON i.fecha_emision = dt.fecha
WHERE dt.fecha IS NULL;

-- Step 6: Populate DIM_Tipo_Combustible
PRINT 'Populating DIM_Tipo_Combustible...'
INSERT INTO dbo.DIM_Tipo_Combustible (combustible)
SELECT DISTINCT tc.combustible
FROM OLTP_SMTDRV.dbo.Tipo_Combustible tc
LEFT JOIN dbo.DIM_Tipo_Combustible dtc ON tc.combustible = dtc.combustible
WHERE dtc.combustible IS NULL;

-- Step 7: Populate DIM_Tipo_Servicio
PRINT 'Populating DIM_Tipo_Servicio...'
INSERT INTO dbo.DIM_Tipo_Servicio (servicio)
SELECT DISTINCT ts.servicio
FROM OLTP_SMTDRV.dbo.Tipo_Servicio ts
LEFT JOIN dbo.DIM_Tipo_Servicio dts ON ts.servicio = dts.servicio
WHERE dts.servicio IS NULL;

-- Step 8: Populate DIM_Tipo_Uso
PRINT 'Populating DIM_Tipo_Uso...'
INSERT INTO dbo.DIM_Tipo_Uso (uso)
SELECT DISTINCT tu.uso
FROM OLTP_SMTDRV.dbo.Tipo_Uso tu
LEFT JOIN dbo.DIM_Tipo_Uso dtu ON tu.uso = dtu.uso
WHERE dtu.uso IS NULL;

-- Step 9: Populate DIM_Tipo_Vehiculo
PRINT 'Populating DIM_Tipo_Vehiculo...'
INSERT INTO dbo.DIM_Tipo_Vehiculo (vehiculo)
SELECT DISTINCT tv.vehiculo
FROM OLTP_SMTDRV.dbo.Tipo_Vehiculo tv
LEFT JOIN dbo.DIM_Tipo_Vehiculo dtv ON tv.vehiculo = dtv.vehiculo
WHERE dtv.vehiculo IS NULL;

-- Step 10: Populate HECHO_INSCRIPCION
PRINT 'Populating HECHO_INSCRIPCION...'
INSERT INTO dbo.HECHO_INSCRIPCION (
    num_placa,
    modelo,
    Id_dim_propietario,
    Id_dim_tiempo,
    Id_dim_departamento,
    Id_dim_marca,
    Id_dim_categoria,
    Id_dim_tipo_servicio,
    Id_dim_tipo_uso,
    Id_dim_tipo_combustible,
    Id_dim_tipo_vehiculo
)
SELECT
    i.num_placa,
    v.modelo,
    dp.Id_dim_propietario,
    dt.Id_dim_tiempo,
    dd.Id_dim_departamento,
    dm.Id_dim_marca,
    dc.Id_dim_categoria,
    dts.Id_dim_tipo_servicio,
    dtu.Id_dim_tipo_uso,
    dtc.Id_dim_tipo_combustible,
    dtv.Id_dim_tipo_vehiculo
FROM OLTP_SMTDRV.dbo.Inscripcion i
INNER JOIN OLTP_SMTDRV.dbo.Vehiculo v ON i.Id_vehiculo = v.Id_vehiculo
INNER JOIN OLTP_SMTDRV.dbo.Propietario p ON i.Id_propietario = p.Id_propietario
INNER JOIN OLTP_SMTDRV.dbo.Tipo_Propietario tp ON p.Id_tipo_propietario = tp.Id_tipo_propietario
INNER JOIN dbo.DIM_Propietario dp ON tp.propietario = dp.propietario
INNER JOIN dbo.DIM_Tiempo dt ON CAST(i.fecha_emision AS DATE) = dt.fecha
LEFT JOIN OLTP_SMTDRV.dbo.Departamento d ON i.Id_departamento = d.Id_departamento
LEFT JOIN dbo.DIM_Departamento dd ON d.departamento = dd.departamento
LEFT JOIN OLTP_SMTDRV.dbo.Marca m ON v.Id_marca = m.Id_marca
LEFT JOIN dbo.DIM_Marca dm ON m.marca = dm.marca
LEFT JOIN OLTP_SMTDRV.dbo.Categoria c ON v.Id_categoria = c.Id_categoria
LEFT JOIN dbo.DIM_Categoria dc ON c.categoria = dc.categoria
LEFT JOIN OLTP_SMTDRV.dbo.Tipo_Servicio tser ON v.Id_tipo_servicio = tser.Id_tipo_servicio
LEFT JOIN dbo.DIM_Tipo_Servicio dts ON tser.servicio = dts.servicio
LEFT JOIN OLTP_SMTDRV.dbo.Tipo_Uso tu ON v.Id_tipo_uso = tu.Id_tipo_uso
LEFT JOIN dbo.DIM_Tipo_Uso dtu ON tu.uso = dtu.uso
LEFT JOIN OLTP_SMTDRV.dbo.Tipo_Combustible tc ON v.Id_tipo_combustible = tc.Id_tipo_combustible
LEFT JOIN dbo.DIM_Tipo_Combustible dtc ON tc.combustible = dtc.combustible
LEFT JOIN OLTP_SMTDRV.dbo.Tipo_Vehiculo tv ON v.Id_tipo_vehiculo = tv.Id_tipo_vehiculo
LEFT JOIN dbo.DIM_Tipo_Vehiculo dtv ON tv.vehiculo = dtv.vehiculo;

PRINT 'ETL process completed.'
GO