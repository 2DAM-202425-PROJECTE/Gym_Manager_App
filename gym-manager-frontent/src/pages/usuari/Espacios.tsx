import { useState, useEffect, useContext } from "react";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import apiClient from "../../api/prefijo";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export default function ReservasPage() {
  const { userContext } = useContext(UserContext);
  const user_id = userContext.user?.id;
  const [espacios, setEspacios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const response = await apiClient.get("/espacios");
        setEspacios(response.data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };
    
    const fetchReservas = async () => {
      try {
        const response = await apiClient.get(`/reservas/${user_id}`);
        setReservas(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    
    fetchEspacios();
    fetchReservas();
  }, [user_id]);

  const handleReservar = async (espacio: { id: any; }) => {
    try {
      await apiClient.post("/reservas", { user_id, espacio_id: espacio.id });
      toast.success("Reserva realizada con éxito");
    } catch (error) {
      console.error("Error reservando espacio:", error);
      toast.error("Error al reservar");
    }
  };

  const handleCancelarReserva = async (id: any) => {
    try {
      await apiClient.delete(`/reservas/${id}`);
      toast.success("Reserva cancelada");
    } catch (error) {
      console.error("Error cancelando reserva:", error);
      toast.error("No se pudo cancelar la reserva");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Reservas de Equipos/Espacios</h2>
          </header>
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-maroon-600 mb-4">Espacios Disponibles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {espacios.map((espacio) => (
                <div key={espacio.id} className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-semibold text-gray-800">{espacio.nombre}</h4>
                  <div className="text-gray-600 mt-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{espacio.horario}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReserva(espacio);
                      setModalOpen(true);
                    }}
                    className="w-full mt-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors"
                  >
                    Reservar
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-maroon-600 mt-8 mb-4">Mis Reservas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservas.map((reserva) => (
                <div key={reserva.id} className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-semibold text-gray-800">{reserva.espacio.nombre}</h4>
                  <div className="text-gray-600 mt-2 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{reserva.fecha}</span>
                  </div>
                  <button
                    onClick={() => handleCancelarReserva(reserva.id)}
                    className="w-full mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Cancelar Reserva
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
