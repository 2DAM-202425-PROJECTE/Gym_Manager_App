import { User } from "./user";

export interface HorarioToSend {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
  
}

export interface Horario {
    id: number;
    clase_id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    created_at: string;
    updated_at: string;
  }
  
export interface Clase {
    id: number;
    nombre: string;
    descripcion: string;
    id_entrenador: number;
    maximo_participantes: number;
    created_at: string;
    entrenador: User;
    updated_at: string;
    horarios: Horario[];
    participantes: User[];
    presente?: boolean;
  }
  