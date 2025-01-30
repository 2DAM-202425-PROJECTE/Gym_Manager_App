import apiClient from "../prefijo";
import { User } from "../../type/user";

export async function login({ email, password }: { email: string; password: string }) {
    try {
        const response = await apiClient.post("/login", { email, password });

        const user = response.data.user as User;

        return user;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            if (error.response.status === 401) {
                return { error: "Credenciales incorrectas. Verifica tu usuario y contraseña." };
            } else if (error.response.status === 403) {
                return { error: "Acceso denegado. No tienes permisos suficientes." };
            } else {
                return { error: "Error en el servidor. Inténtalo más tarde." };
            }

        } else if (error.request) {
            console.error("❌ No se recibió respuesta del servidor:", error.request);
            return { error: "No se pudo conectar con el servidor. Verifica tu conexión." };

        } else {
            console.error("❌ Error en la configuración de la solicitud:", error.message);
            return { error: "Error desconocido. Intenta de nuevo." };
        }
    }
}



export async function register({ name, email, password }: { name: string; email: string; password: string }) {


    try {
        const response = await apiClient.post("/register", { name, email, password });

        const user = response.data as User;

        return user

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            if (error.response.status === 400) {
                return { error: "Datos de registro inválidos. Verifica la información proporcionada." };
            } else {
                return { error: "Error en el servidor. Inténtalo más tarde." };
            }

        } else if (error.request) {
            console.error("❌ No se recibió respuesta del servidor:", error.request);
            return { error: "No se pudo conectar con el servidor. Verifica tu conexión." };

        } else {
            console.error("❌ Error en la configuración de la solicitud:", error.message);
            return { error: "Error desconocido. Intenta de nuevo." };
        }
    }
}
