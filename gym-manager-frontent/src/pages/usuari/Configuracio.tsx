import { useEffect, useState } from "react";
import { User, Lock, CreditCard } from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/prefijo";
import { User as UserType} from "../../type/user"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Lock },
    { id: "billing", label: "Facturación", icon: CreditCard },
  ];
  const [user, setUser] = useState<UserType>()
    
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await apiClient.get("/my_info");
        console.log(response);
        setUser(response.data);

      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <Sidebar></Sidebar>
        <div className="p-8 flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Configuración</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-4 py-2 mr-4 rounded-md transition-colors ${
                    activeTab === tab.id ? "bg-maroon-600 text-white" : "text-gray-600 hover:bg-maroon-100"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información del Perfil</h3>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        value={user?.name}
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <p>
                        {user?.email}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                      Guardar Cambios
                    </button>
                  </form>
                </div>
              )}
              {activeTab === "security" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Seguridad de la Cuenta</h3>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        name="current-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                      />
                    </div>
                    <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                      Cambiar Contraseña
                    </button>
                  </form>
                </div>
              )}
             
              {activeTab === "billing" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información de Facturación</h3>
                  <p className="mb-4">
                    Próxima facturación: <span className="font-semibold">{user?.membresia?.fecha_fin}</span>
                  </p>
                  <button onClick={() => window.location.href = "/tarifas"} className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Cambiar Plan
                  </button>
                </div>
              )}
              {activeTab === "help" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Centro de Ayuda</h3>
                  <p className="mb-4">Si necesitas ayuda, puedes contactarnos de las siguientes maneras:</p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Correo electrónico: soporte@powergym.com</li>
                    <li>Teléfono: +1 234 567 890</li>
                    <li>Chat en vivo: Disponible de lunes a viernes, de 9:00 a 18:00</li>
                  </ul>
                  <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Iniciar Chat en Vivo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}