import { User } from "./user";

export type Entrenador = {
    entrenador_id: number;
    especialidad: string;
    experiencia: string;
    disponibilidad: string;
    phone_number: string;
    certificaciones: string;
    descripcion: string;
    user: User;
  };
  