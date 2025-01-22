// hooks/useAdminPanel.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Producto } from '@/types/Producto';
import { Categoria } from '@/types/Categoria';

export const useAdminPanel = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);  // Estado para las categorías
  const [newProduct, setNewProduct] = useState<{ title: string; price: string; categoryIds: string[]; imageUrl: File | null }>({
    title: '',
    price: '',
    categoryIds: [],
    imageUrl: null
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();  // Cargar las categorías desde la nueva ruta
  }, []);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Producto[]>('http://localhost:3001/api/productos/list');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // En caso de error, asegurarse de que products sea un array vacío
    }
  };

  // Obtener categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Categoria[]>('http://localhost:3001/api/categorias/all');
      setCategories(response.data); // Guardamos las categorías en el estado
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Crear un producto
  const handleCreateProduct = async () => {
    const { title, price, categoryIds, imageUrl } = newProduct;
    if (!title || !price || !categoryIds.length || !imageUrl) return;

    const formData = new FormData();
    formData.append('titulo', title);
    formData.append('precio', price);
    formData.append('categoria_id', categoryIds.join(',')); // Enviar múltiples categorías como una cadena separada por comas
    formData.append('imagen_url', imageUrl);

    try {
      const response = await axios.post<{ product: Producto }>('http://localhost:3001/api/productos/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProducts([...products, response.data.product]);
      setNewProduct({ title: '', price: '', categoryIds: [], imageUrl: null });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Manejo de cambio en los checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setNewProduct(prevState => {
      const categoryIds = checked
        ? [...prevState.categoryIds, value]
        : prevState.categoryIds.filter(id => id !== value);
      return { ...prevState, categoryIds };
    });
  };

  // Eliminar producto
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/productos/delete/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return {
    products,
    categories,
    newProduct,
    setNewProduct,
    fetchProducts,
    fetchCategories,
    handleCreateProduct,
    handleCheckboxChange,
    handleDeleteProduct
  };
};
