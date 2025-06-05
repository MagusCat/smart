import { useState, useEffect, useCallback } from 'react';

// CORRECCIÓN CLAVE: Usar import.meta.env para variables de entorno en Vite
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000/api';

const useCategorias = (initialPage = 1, initialLimit = 10) => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null); // Se mantiene fetchError por consistencia con CategoriaList
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCategorias = useCallback(async () => {
        setLoading(true);
        setFetchError(null);
        try {
            const url = new URL(`${API_BASE_URL}/categorias`);
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);
            // La versión anterior no tenía 'search' en el hook para fetchCategorias general
            // Si quieres añadir búsqueda, necesitarías pasar un parámetro 'search' y agregarlo a url.searchParams
            
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Error al cargar categorías');
            }
            
            const data = await response.json();
            
            setCategorias(data.data);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        } catch (err) {
            setFetchError(err.message || 'Error al cargar categorías');
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    const createCategoria = useCallback(async (categoryData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Error al crear categoría');
            }

            const data = await response.json(); // Leer la respuesta exitosa
            await fetchCategorias(); // Refrescar lista
            return data;
        } catch (err) {
            const errorMsg = err.message || 'Error al crear categoría';
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [fetchCategorias]);

    const updateCategoria = useCallback(async (id, categoryData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Error al actualizar categoría');
            }
            
            const data = await response.json(); // Leer la respuesta exitosa
            await fetchCategorias(); // Refrescar toda la lista para que la paginación se actualice bien
            return data;
        } catch (err) {
            const errorMsg = err.message || 'Error al actualizar categoría';
            throw new new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [fetchCategorias]);

    const deleteCategoria = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Error al eliminar categoría');
            }
            
            // Recalcular la página después de eliminar para evitar páginas vacías
            // Esta lógica es un poco más compleja con fetch, pero la mantengo si la tenías
            const newTotal = total - 1;
            const newTotalPages = Math.ceil(newTotal / limit);
            const newPage = page > newTotalPages ? Math.max(1, newTotalPages) : page;
            
            await fetchCategorias(newPage);
        } catch (err) {
            const errorMsg = err.message || 'Error al eliminar categoría';
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [fetchCategorias, total, limit, page]);

    return {
        categorias,
        loading,
        fetchError,
        page,
        limit,
        total,
        totalPages,
        setPage,
        setLimit,
        createCategoria,
        updateCategoria,
        deleteCategoria,
        // searchCategorias no estaba implementado en el hook antes de la refactorización profunda
    };
};

export default useCategorias;