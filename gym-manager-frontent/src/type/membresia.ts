import { Tarifa } from "./tarifas";

export type Membresia = {
    id: number;
    user_id: number;
    fecha_fin: string;
    qr_data: string;
    created_at: Date;
    updated_at: Date;
    last_tarifa: Tarifa;
  }
  