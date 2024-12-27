export interface Usuario {
    id: number; // Aquí 'number' porque es un campo de tipo SERIAL en PostgreSQL
    email: string;
    password: string;
    nombre: string;
    foto_perfil?: string;  // Foto del perfil, opcional
    rol: 'administrador' | 'usuario'; // Rol del usuario
    creado_en: string; // Fecha de creación del usuario
  }
  