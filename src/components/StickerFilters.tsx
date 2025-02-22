import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'; // Importar router y searchParams
import { Categoria } from '@/types/Categoria';
import style from '@/styles/Filter.module.css';

const CategoryFilterPanel: React.FC = () => {
    const [categories, setCategories] = useState<Categoria[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        axios.get<Categoria[]>('http://localhost:3001/api/categorias/all')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error al obtener categorías:', error));
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (categoryId) {
            params.set("category", categoryId);
        } else {
            params.delete("category");
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className={style.filterContenedor}>
            <input
                className={style.searchInput}
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (e.target.value) {
                        params.set("search", e.target.value);
                    } else {
                        params.delete("search");
                    }
                    router.push(`/products?${params.toString()}`);
                }}
            />

            <p className={style.textCategorias}>Filtrar por Categoría</p>
            <div className={style.categoryContainer}>
                <div
                    onClick={() => handleCategoryClick("")}
                    className={`${style.categoryItem} ${!searchParams.get("category") ? style.selected : ""}`}
                >
                    Todas
                </div>
                {categories.map(category => (
                    <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id.toString())}
                        className={`${style.categoryItem} ${searchParams.get("category") === category.id.toString() ? style.selected : ""}`}
                    >
                        {category.nombre}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilterPanel;
