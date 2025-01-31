import apiClient from "../prefijo";
import { User } from "../../type/user";

export async function login({ email, password }: { email: string; password: string }) {
    try {
        const response = await apiClient.post("/login", { email, password });
        const user = response.data.user as User;
        return user;
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            if (error.response.status === 401) {
                throw new Error("Credenciales incorrectas. Verifica tu usuario y contraseña.");
            } else if (error.response.status === 403) {
                throw new Error("Acceso denegado. No tienes permisos suficientes.");
            } else {
                throw new Error("Error en el servidor. Inténtalo más tarde.");
            }
        } else if (error.request) {
            console.error("❌ No se recibió respuesta del servidor:", error.request);
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
            console.error("❌ Error en la configuración de la solicitud:", error.message);
            throw new Error("Error desconocido. Intenta de nuevo.");
        }
    }
}



export async function register({ name, email, password }: { name: string; email: string; password: string }) {
    try {
        const response = await apiClient.post("/register", { name, email, password });
        const user = response.data as User;
        return user;
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            if (error.response.status === 400) {
                throw new Error("Correu electronic no valid");
            } else if (error.response.status === 422) {
                throw new Error("Ja existeix un compte amb este email");
            } else {
                throw new Error("Error en el servidor. Inténtalo más tarde.");
            }
        } else if (error.request) {
            console.error("❌ No se recibió respuesta del servidor:", error.request);
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
            console.error("❌ Error en la configuración de la solicitud:", error.message);
            throw new Error("Error desconocido. Intenta de nuevo.");
        }
    }
}

