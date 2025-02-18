// export interface CarritoProducto {
//     id: number; // ID de la relación entre el carrito y el producto
//     carrito_id: number; // Relación con la tabla de carritos
//     producto_id: number; // Relación con la tabla de productos
//     cantidad: number; // Cantidad del producto en el carrito
//   }

  export interface CarritoProducto {
    id: number;
    producto_id: number;
    cantidad: number;
    titulo: string;
    precio: string;
    imagen_url: string;
    carrito_id: number;
  }