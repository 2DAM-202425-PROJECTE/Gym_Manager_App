import apiClient from "../prefijo";
import { User } from "../../type/user";
import { toast } from "react-toastify";


export async function login({ email, password }: { email: string; password: string }) {
    try {
        const response = await apiClient.post("/login", { email, password });
        const user = response.data.user as User;
        const token = response.data.token;

        if (token) {
          await localStorage.setItem("token", token);
          console.log("🔐 Token guardado en localStorage:", token);
        } else {
          console.warn("⚠️ No se recibió ningún token en la respuesta.");
        }
        toast.success('Inici de sessio correcte');
        
        return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            if (error.response.status === 401) {
                toast.error('Credenciales incorrectas. Verifica tu usuario y contraseña.');
            } else if (error.response.status === 403) {
                toast.error("Acceso denegado. No tienes permisos suficientes.");
            } else if (error.response.data.message && error.response.data.message.includes('valid email')) {
                toast.error('No es un correu valid');
            } else {
                toast.error("Error en el servidor. Inténtalo más tarde.");
            }
        } else if (error.request) {
            toast.error("Error en el servidor. Inténtalo más tarde.");

        } else {
            toast.error("Error en el servidor. Inténtalo más tarde.");
        }
    }
}



export async function register({ name, email, password, confirmPassword }: { name: string; email: string; password: string ; confirmPassword: string }) {
    if (password !== confirmPassword) {
        toast.error('Les contrasenyes no coincideixen');
        
    }

    try {
        const response = await apiClient.post("/register", { name, email, password });
        const user = response.data as User;
        toast.success('Registre completat');
        return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response) {
            console.error(`❌ Error HTTP ${error.response.status}:`, error.response.data);
            console.log('Full error response:', error.response); // Log the entire error response
            const errorMessage = error.response.data.message || 'Unknown error occurred';

            if (errorMessage.includes('taken')) {
                toast.error('Ja existeix un compte amb este email');
            } else if (errorMessage.includes('valid')) {
                toast.error('Correu electronic no valid');
            } else {
                toast.error('Error en el servidor. Inténtalo más tarde.');
            }
        } else if (error.request) {
            toast.error("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
            toast.error("Error desconocido. Intenta de nuevo.");
        }
    }
}

export async function logout({navigate}) {
    try {
        await apiClient.post("/logout");
        localStorage.removeItem("token");
        toast.success('Tancat sessio');
        navigate('/login');
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error al tancar sessio");
    }

}

