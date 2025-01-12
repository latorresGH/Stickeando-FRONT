import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Categoria } from '@/types/Categoria';
import style from '@/styles/Filter.module.css'

interface CategoryFilterPanelProps {
    onFilter: (categoryId: string, searchQuery: string) => void;
}

const CategoryFilterPanel: React.FC<CategoryFilterPanelProps> = ({ onFilter }) => {
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Obtener categorías desde el backend
        axios.get<Categoria[]>('http://localhost:3001/api/categorias/all')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error al obtener categorías:', error));
    }, []);

    const handleFilter = () => {
        onFilter(selectedCategory, searchQuery);
    };

    return (
        <div className={style.filterContenedor}>
            <h3>Filtrar por Categoría</h3>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Todas</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id.toString()}>
                        {category.nombre}
                    </option>
                ))}
            </select>

            <h3>Buscar</h3>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Buscar productos..." 
            />

            <button onClick={handleFilter}>Aplicar Filtros</button>
        </div>
    );
};

export default CategoryFilterPanel;
