export interface Producto {
    id: number,
    titulo: string,
    precio: number,
    imagen_url: string,
    categoria_id: number,
    carrito_id?: number;
}