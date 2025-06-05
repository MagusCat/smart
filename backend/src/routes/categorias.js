import { Router } from 'express';
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validación manual
const validateCategoryData = (req, res, next) => {
    const { categoria } = req.body;
    const errors = [];

    if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
        errors.push('El nombre de categoría es requerido y debe ser texto');
    }

    if (categoria && categoria.length > 100) {
        errors.push('El nombre no puede exceder 100 caracteres');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
};

const validateCategoryId = (req, res, next) => {
    const { id_categoria } = req.params;

    if (!id_categoria || isNaN(parseInt(id_categoria))) {
        return res.status(400).json({ success: false, error: 'ID de categoría inválido' });
    }

    next();
};

// GET todas las categorías con paginación y sequential_code
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const pool = await poolOLTP;

        // 1. Obtener el total de registros (sin paginación)
        const countResult = await pool.request()
            .query('SELECT COUNT(*) AS total FROM Categorias');
        const total = countResult.recordset[0].total;

        // 2. Obtener los datos con sequential_code y aplicar paginación
        const result = await pool.request()
            .input('offset', sql.Int, offset)
            .input('limit', sql.Int, limit)
            .query(`
                SELECT id_categoria, categoria,
                       ROW_NUMBER() OVER (ORDER BY id_categoria ASC) as sequential_code
                FROM Categorias
                ORDER BY sequential_code ASC
                OFFSET @offset ROWS
                FETCH NEXT @limit ROWS ONLY
            `);

        res.json({
            success: true,
            data: result.recordset,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener las categorías',
            details: error.message
        });
    }
});

// GET categoría por ID
router.get('/:id_categoria', validateCategoryId, async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const pool = await poolOLTP;

        const result = await pool.request()
            .input('id_categoria', sql.Int, id_categoria)
            .query('SELECT id_categoria, categoria FROM Categorias WHERE id_categoria = @id_categoria');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            data: result.recordset[0]
        });
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener categoría',
            details: error.message
        });
    }
});

// POST crear categoría
router.post('/', validateCategoryData, async (req, res) => {
    try {
        const { categoria } = req.body;
        const pool = await poolOLTP;

        // Verificación si la categoría ya existe
        const exists = await pool.request()
            .input('categoria', sql.NVarChar(100), categoria)
            .query('SELECT 1 FROM Categorias WHERE categoria = @categoria');
        if (exists.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'La categoría ya existe'
            });
        }

        const result = await pool.request()
            .input('categoria', sql.NVarChar(100), categoria)
            .query('INSERT INTO Categorias (categoria) OUTPUT INSERTED.id_categoria VALUES (@categoria)');

        res.status(201).json({
            success: true,
            data: {
                id_categoria: result.recordset[0].id_categoria,
                categoria
            },
            message: 'Categoría creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear categoría',
            details: error.message
        });
    }
});

// PUT actualizar categoría
router.put('/:id_categoria', validateCategoryId, validateCategoryData, async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const { categoria } = req.body;
        const pool = await poolOLTP;

        // Verificar si la categoría a ACTUALIZAR existe (esto es necesario para el 404)
        const exists = await pool.request()
            .input('id_categoria', sql.Int, id_categoria)
            .query('SELECT categoria FROM Categorias WHERE id_categoria = @id_categoria');

        if (exists.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Categoría no encontrada'
            });
        }

        // Verificación si el nuevo nombre ya existe (en otra categoría)
        const nameExists = await pool.request()
            .input('categoria', sql.NVarChar(100), categoria)
            .input('id_categoria', sql.Int, id_categoria)
            .query('SELECT 1 FROM Categorias WHERE categoria = @categoria AND id_categoria != @id_categoria');
        if (nameExists.recordset.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'El nombre de categoría ya está en uso'
            });
        }

        await pool.request()
            .input('id_categoria', sql.Int, id_categoria)
            .input('categoria', sql.NVarChar(100), categoria)
            .query('UPDATE Categorias SET categoria = @categoria WHERE id_categoria = @id_categoria');

        res.json({
            success: true,
            data: {
                id_categoria: parseInt(id_categoria),
                categoria
            },
            message: 'Categoría actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar categoría',
            details: error.message
        });
    }
});

// DELETE eliminar categoría
router.delete('/:id_categoria', validateCategoryId, async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const pool = await poolOLTP;

        // Verificar si la categoría existe
        const exists = await pool.request()
            .input('id_categoria', sql.Int, id_categoria)
            .query('SELECT categoria FROM Categorias WHERE id_categoria = @id_categoria');

        if (exists.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Categoría no encontrada'
            });
        }

        // Eliminar la categoría
        await pool.request()
            .input('id_categoria', sql.Int, id_categoria)
            .query('DELETE FROM Categorias WHERE id_categoria = @id_categoria');

        res.json({
            success: true,
            message: 'Categoría eliminada exitosamente',
            id_categoria: parseInt(id_categoria)
        });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar categoría',
            details: error.message
        });
    }
});

export default router;