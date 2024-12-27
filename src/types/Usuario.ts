export interface Usuario {
    id: number; // Aquí 'number' porque es un campo de tipo SERIAL en PostgreSQL
    nombre: string;
    correo: string;
    contrasena: string;
    foto_perfil?: string;  // Foto del perfil, opcional
  }
  