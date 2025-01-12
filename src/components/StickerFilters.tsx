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
            <input
                className={style.searchInput}
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Buscar productos..." 
            />

            <p className={style.textCategorias}>Filtrar por Categoría</p>
            <div className={style.categoryContainer}>
                <div
                    onClick={() => setSelectedCategory('')}
                    className={`${style.categoryItem} ${selectedCategory === '' ? style.selected : ''}`}
                >
                    Todas
                </div>
                {categories.map(category => (
                    <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id.toString())}
                    className={`${style.categoryItem} ${selectedCategory === category.id.toString() ? style.selected : ''}`}
                    >
                    {category.nombre}
                    </div>
                ))}
                </div>




            <button onClick={handleFilter} className={style.buttonAplicar}>Aplicar Filtros</button>
        </div>
    );
};

export default CategoryFilterPanel;
