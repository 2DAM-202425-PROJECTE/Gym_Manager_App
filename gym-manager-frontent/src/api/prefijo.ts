import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});

export default apiClient;
