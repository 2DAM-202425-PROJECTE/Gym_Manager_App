import { User } from "./user";

export type Entrenador = {
    id: number;
    entrenador_id: number;
    especialidad: string;
    experiencia: string;
    disponibilidad: string[];
    phone_number: string;
    certificaciones: string;
    descripcion: string;
    user: User;
    valoracion_media: number;
    nombre_completo?: string;
  };
