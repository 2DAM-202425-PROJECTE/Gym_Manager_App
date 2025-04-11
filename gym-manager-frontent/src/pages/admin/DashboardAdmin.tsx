import type React from "react";
import { useState } from "react";
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
import GestionEspacios from "./GestionEspacios";
import GestionEntrenadores from "./GestionEntrenadores";

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

  const userStats = {
    total: 500,
    clientes: 450,
    admin: 10,
    entrenadores: 40,
  };

  const tarifasData = {
    labels: ["Mensual", "Trimestral", "Semestral", "Anual"],
    datasets: [
      {
        label: "Tarifas vendidas",
        data: [65, 40, 30, 15],
        backgroundColor: ["#092756", "#1c2541", "#3a506b", "#5bc0be"],
      },
    ],
  };

  const clasesData = {
    labels: ["Yoga", "Spinning", "Zumba", "Pilates", "Boxeo"],
    datasets: [
      {
        label: "Asistencia promedio",
        data: [12, 19, 15, 10, 8],
        backgroundColor: "#092756",
      },
    ],
  };

  const ingresosData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos ($)",
        data: [5000, 6000, 5500, 7000, 7500],
        borderColor: "#5bc0be",
        backgroundColor: "rgba(91, 192, 190, 0.2)",
      },
    ],
  };

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

  const renderDashboard = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Estadísticas de Usuarios</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#092756] text-white p-4 rounded-lg">
              <p className="text-lg">Total Usuarios</p>
              <p className="text-3xl font-bold">{userStats.total}</p>
            </div>
            <div className="bg-[#1c2541] text-white p-4 rounded-lg">
              <p className="text-lg">Clientes</p>
              <p className="text-3xl font-bold">{userStats.clientes}</p>
            </div>
            <div className="bg-[#3a506b] text-white p-4 rounded-lg">
              <p className="text-lg">Administradores</p>
              <p className="text-3xl font-bold">{userStats.admin}</p>
            </div>
            <div className="bg-[#5bc0be] text-white p-4 rounded-lg">
              <p className="text-lg">Entrenadores</p>
              <p className="text-3xl font-bold">{userStats.entrenadores}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Tarifas Vendidas</h2>
          <Doughnut data={tarifasData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Ingresos Mensuales</h2>
          <Line data={ingresosData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#092756]">Retención de Clientes</h2>
          <Line data={retencionData} />
        </div>
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