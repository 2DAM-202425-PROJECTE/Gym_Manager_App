import { toast } from "react-toastify";
import apiClient from "../prefijo";
import { User } from "../../type/user";

export async function getUsers() {
  try {
    const usersApi = await apiClient.get("/users");
    const usuaris = usersApi.data as User[];
    return usuaris;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast("Error al obtener los usuarios");
  }
}