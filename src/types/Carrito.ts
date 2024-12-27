export interface Carrito {
    id: number; // id del carrito (auto-incremental)
    usuario_id: number | null; // Puede ser null si el usuario no está registrado
    uuid: string | null; // uuid del carrito si el usuario no está registrado
    creado_en: string; // Fecha de creación del carrito
  }
  