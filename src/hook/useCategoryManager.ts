// hooks/useCategoryManager.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Categoria } from '@/types/Categoria';

export const useCategoryManager = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  // Obtener las categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Categoria[]>('http://localhost:3001/api/categorias/all');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // En caso de error, asegurarse de que categories sea un array vacío
    }
  };

  // Crear una nueva categoría
  const handleCreateCategory = async () => {
    if (!newCategoryName) {
      console.error('El nombre de la categoría está vacío');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:3001/api/categorias/create',
        { nombre: newCategoryName }, // Estás enviando 'nombre' como propiedad
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setCategories([...categories, response.data.category]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Eliminar una categoría
  const handleDeleteCategory = async (id: number) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      
      if (!token) {
        console.error('Token no encontrado');
        return;
      }
  
      await axios.delete(`http://localhost:3001/api/categorias/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
        },
      });
  
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return {
    categories,
    newCategoryName,
    setNewCategoryName,
    handleCreateCategory,
    handleDeleteCategory
  };
};
