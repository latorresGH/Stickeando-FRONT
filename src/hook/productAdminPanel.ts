// hooks/useAdminPanel.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Producto } from '@/types/Producto';
import { Categoria } from '@/types/Categoria';

export const useAdminPanel = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [newProduct, setNewProduct] = useState<{ title: string; price: string; categoryIds: string[]; imageUrl: File | null }>({
    title: '',
    price: '',
    categoryIds: [],
    imageUrl: null
  });
  const [successMessage, setSuccessMessage] = useState<string>(''); // Mensaje de éxito
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Producto[]>('https://stickeando.onrender.com/api/productos/list');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Categoria[]>('https://stickeando.onrender.com/api/categorias/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // const handleCreateProduct = async () => {
  //   const { title, price, categoryIds, imageUrl } = newProduct;
  //   if (!title || !price || !categoryIds.length || !imageUrl) return;

  //   setLoading(true); // Iniciar carga
  //   const formData = new FormData();
  //   formData.append('titulo', title);
  //   formData.append('precio', price);
  //   formData.append('categoria_id', categoryIds.join(','));
  //   formData.append('imagen_url', imageUrl);

  //   try {
  //     const response = await axios.post<{ product: Producto }>('https://stickeando.onrender.com/api/productos/create', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //     setProducts([...products, response.data.product]);
  //     setNewProduct({ title: '', price: '', categoryIds: [], imageUrl: null });
  //     setSuccessMessage('Producto subido correctamente'); // Mostrar mensaje de éxito
  //   } catch (error) {
  //     console.error('Error creating product:', error);
  //     setSuccessMessage('Hubo un error al subir el producto'); // Mensaje de error
  //   } finally {
  //     setLoading(false); // Finalizar carga
  //   }
  // };

  const handleCreateProduct = async () => {
    const { title, price, categoryIds, imageUrl } = newProduct;
    if (!title || !price || !categoryIds.length || !imageUrl) return;
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('titulo', title);
    formData.append('precio', price);
    formData.append('categoria_id', categoryIds.join(','));
    formData.append('imagen', imageUrl); // La imagen se envía como archivo
  
    try {
      const response = await axios.post('https://stickeando.onrender.com/api/productos/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      setProducts([...products, response.data.product]);
      setNewProduct({ title: '', price: '', categoryIds: [], imageUrl: null });
      setSuccessMessage('Producto subido correctamente');
    } catch (error) {
      console.error('Error creating product:', error);
      setSuccessMessage('Hubo un error al subir el producto');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setNewProduct(prevState => {
      const categoryIds = checked
        ? [...prevState.categoryIds, value]
        : prevState.categoryIds.filter(id => id !== value);
      return { ...prevState, categoryIds };
    });
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://stickeando.onrender.com/api/productos/delete/${id}`);
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
    handleDeleteProduct,
    successMessage, // Agregar el mensaje de éxito
    loading, // Agregar el estado de carga
  };
};
