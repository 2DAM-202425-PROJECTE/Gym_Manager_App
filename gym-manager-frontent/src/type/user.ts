import { Membresia } from "./membresia";

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    current_team_id: number | null;
    profile_photo_path: string | null;
    created_at: string;
    updated_at: string;
    two_factor_confirmed_at: string | null;
    role: string;
    profile_photo_url: string;
    membresia: Membresia | null;

  };

  