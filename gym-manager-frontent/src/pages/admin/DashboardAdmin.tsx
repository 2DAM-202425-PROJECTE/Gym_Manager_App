import type React from "react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import GestionTarifas from "../admin/GestionTarifas";
import GestionUsuarios from "../admin/GestionUsuarios";
import GestionClases from "./GestionClases";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import GestionEntrenadores from "./GestionEntrenadores";
import { UserPanel } from "../../components/analitycs/UserPanel";
import { getUsers } from "../../api/user/getUsers";
import { User } from "../../type/user";
import apiClient from "../../api/prefijo";
import { Tarifa } from "../../type/tarifas";
import { PagosPorMes } from "../../type/PagoPorMes";
import { ordenarPagosPorMes } from "../../utils/ordenarMeses";
import { Clase } from "../../type/clases";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const [usuarios, setUsuarios] = useState<User[]>([])
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [pagos, setPagos] = useState<PagosPorMes>({});
  const [ clases, setClases] = useState<Clase[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/tarifas");
        const tarifasObtingudes = response.data as Tarifa[];
        setTarifas(tarifasObtingudes);

        const responseClases = await apiClient.get("/clases");
        const clasesObtingudes = responseClases.data as Clase[];
        console.log(clasesObtingudes);
        setClases(clasesObtingudes);

        const responseUsers = await getUsers()
        if (responseUsers){
            setUsuarios(responseUsers)
          }

          const responsePago = await apiClient.get("/pagos");
          const pagos = responsePago.data as PagosPorMes;
          const pagosOrdenadors = ordenarPagosPorMes(pagos)
          console.log(pagosOrdenadors);
          setPagos(pagosOrdenadors);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setTarifas([]);
      }
    };
    fetchData();
  }, []);



  const chartData = {
    labels: tarifas.map((t) => `${t.nombre}`),
    datasets: [
      {
        data: tarifas.map((t) => t.cantidad_pagos),
        backgroundColor: ["#092756", "#1c2541", "#3a506b", "#5bc0be"],
      },
    ], 
  }

  const clasesData = {
    labels: clases.map((t) => `${t.nombre}`),
    datasets: [
      {
        label: "Asistencia promedio",
        data: clases.map((t) => t.participantes.length),
        backgroundColor: "#092756",
      },
    ],
  };
  const ingresosData = {
    labels: Object.keys(pagos), // Extrae las claves del objeto pagos
    datasets: [
      {
        label: "Ingresos ($)",
        data: Object.values(pagos), // Extrae los valores del objeto pagos
        borderColor: "#5bc0be",
        backgroundColor: "rgba(91, 192, 190, 0.2)",
      },
    ],
  };
/*
  const retencionData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Tasa de Retención (%)",
        data: [80, 78, 82, 85, 88],
        borderColor: "#3a506b",
        backgroundColor: "rgba(58, 80, 107, 0.2)",
      },
    ],
  };
*/
  const renderDashboard = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Estadísticas de Usuarios</h2>
          <UserPanel usuarios={usuarios} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Tarifas Vendidas</h2>
          <Doughnut data={chartData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Ingresos Mensuales</h2>
          <Line data={ingresosData} />
        </div>
        {/**    
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#092756]">Retención de Clientes</h2>
            <Line data={retencionData} />
          </div>
         */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Asistencia a Clases</h2>
          <Bar data={clasesData} />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "tarifas":
        return <GestionTarifas />;
      case "usuarios":
        return <GestionUsuarios />;
      case "clases":
        return <GestionClases />;
      case "entrenadors":
        return <GestionEntrenadores/>;

   
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;