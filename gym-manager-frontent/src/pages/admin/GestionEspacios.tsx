import { useEffect, useState } from "react";
import apiClient from "../../api/prefijo";
import { TextFieldAdmin } from "../../components/textFields/TextFieldAdmin";
import { toast } from "react-toastify";
import { RedButtonAdmin } from "../../components/buttons/RedButtonAdmin";
import { GreenButtonAdmin } from "../../components/buttons/GreenButtonAdmin";

interface Espacio {
  id: number;
  usuario: string;
  espacio: string;
  fechaInicio: string;
  fechaFin: string;
  hora: string;
  estado: string;
  imagen?: string;
}

const GestionEspacios = () => {
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroEspacio, setFiltroEspacio] = useState("");
  const [nuevoEspacio, setNuevoEspacio] = useState<Espacio>({ id: 0, usuario: "", espacio: "", fechaInicio: "", fechaFin: "", hora: "", estado: "", imagen: "" });
  const [editingEspacio, setEditingEspacio] = useState<Espacio | null>(null);

  useEffect(() => {
    const obtenerEspacios = async () => {
      try {
        const response = await apiClient.get("/espacios");
        setEspacios(response.data);
      } catch (error) {
        console.error("Error al obtener espacios", error);
      }
    };
    obtenerEspacios();

    const obtenerUsuarios = async () => {
      try {
        const response = await apiClient.get("/usuarios");
        setUsuarios(response.data.map((user: { name: string }) => user.name));
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };
    obtenerUsuarios();
  }, []);

  const handleCancelarEspacio = async (id: number) => {
    try {
      await apiClient.delete(`/espacios/${id}`);
      setEspacios(espacios.filter((espacio) => espacio.id !== id));
      toast("Espacio cancelado correctamente.");
    } catch (error) {
      console.error("Error al cancelar espacio", error);
      toast("Error al cancelar el espacio.");
    }
  };

  const handleAgregarEspacio = async () => {
    try {
      const response = await apiClient.post("/espacios", nuevoEspacio);
      setEspacios([...espacios, response.data]);
      toast("Espacio agregado correctamente.");
      setNuevoEspacio({ id: 0, usuario: "", espacio: "", fechaInicio: "", fechaFin: "", hora: "", estado: "", imagen: "" });
    } catch (error) {
      console.error("Error al agregar espacio", error);
      toast("Error al agregar el espacio.");
    }
  };

  const handleEditarEspacio = async () => {
    if (!editingEspacio) return;
    try {
      const response = await apiClient.put(`/espacios/${editingEspacio.id}`, editingEspacio);
      setEspacios(espacios.map((espacio) => (espacio.id === editingEspacio.id ? response.data : espacio)));
      toast("Espacio actualizado correctamente.");
      setEditingEspacio(null);
    } catch (error) {
      console.error("Error al actualizar espacio", error);
      toast("Error al actualizar el espacio.");
    }
  };

  const espaciosFiltrados = espacios.filter(
    (espacio) =>
      (filtroFecha === "" || espacio.fechaInicio.includes(filtroFecha)) &&
      (filtroUsuario === "" || espacio.usuario.toLowerCase().includes(filtroUsuario.toLowerCase())) &&
      (filtroEspacio === "" || espacio.espacio.toLowerCase().includes(filtroEspacio.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Espacios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <TextFieldAdmin name="fecha" value={filtroFecha} handleChange={(e) => setFiltroFecha(e.target.value)} placeholder="Filtrar por fecha" />
        <TextFieldAdmin name="usuario" value={filtroUsuario} handleChange={(e) => setFiltroUsuario(e.target.value)} placeholder="Filtrar por usuario" />
        <TextFieldAdmin name="espacio" value={filtroEspacio} handleChange={(e) => setFiltroEspacio(e.target.value)} placeholder="Filtrar por espacio" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1c2541] text-white">
              <th className="p-3">Usuario</th>
              <th className="p-3">Espacio</th>
              <th className="p-3">Fecha Inicio</th>
              <th className="p-3">Fecha Fin</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Imagen</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {espaciosFiltrados.map((espacio) => (
              <tr key={espacio.id} className="border-b">
                <td className="p-3">{espacio.usuario}</td>
                <td className="p-3">{espacio.espacio}</td>
                <td className="p-3">{espacio.fechaInicio}</td>
                <td className="p-3">{espacio.fechaFin}</td>
                <td className="p-3">{espacio.hora}</td>
                <td className="p-3">{espacio.estado}</td>
                <td className="p-3">
                  {espacio.imagen && <img src={espacio.imagen} alt={espacio.espacio} className="h-12 w-12 object-cover rounded" />}
                </td>
                <td className="p-3">
                  <RedButtonAdmin text="Cancelar" action={() => handleCancelarEspacio(espacio.id)} />
                  <button
                    onClick={() => setEditingEspacio(espacio)}
                    className="ml-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4 text-[#092756]">Añadir Espacio</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAgregarEspacio(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="usuario"
              value={nuevoEspacio.usuario}
              onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, usuario: e.target.value })}
              placeholder="Usuario"
              className="w-full p-2 border border-gray-300 rounded"
              list="usuarios"
            />
            <datalist id="usuarios">
              {usuarios.map((usuario, index) => (
                <option key={index} value={usuario} />
              ))}
            </datalist>
          </div>
          <select
            name="espacio"
            value={nuevoEspacio.espacio}
            onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, espacio: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccionar Espacio</option>
            <option value="Pista de Tenis">Pista de Tenis</option>
            <option value="Pista de Padel">Pista de Padel</option>
            <option value="Sala de Yoga">Sala de Yoga</option>
            <option value="Sala de Pesas">Sala de Pesas</option>
            <option value="Piscina">Piscina</option>
          </select>
          <input
            type="date"
            name="fechaInicio"
            value={nuevoEspacio.fechaInicio}
            onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, fechaInicio: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="fechaFin"
            value={nuevoEspacio.fechaFin}
            onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, fechaFin: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="time"
            name="hora"
            value={nuevoEspacio.hora}
            onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, hora: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="estado"
            value={nuevoEspacio.estado}
            onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, estado: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccionar Estado</option>
            <option value="Disponible">Disponible</option>
            <option value="En Uso">En Uso</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Cerrado">Cerrado</option>
          </select>
          <TextFieldAdmin name="imagen" value={nuevoEspacio.imagen || ""} handleChange={(e) => setNuevoEspacio({ ...nuevoEspacio, imagen: e.target.value })} placeholder="URL de la imagen" />
          <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] mt-4">
                Añadir Espacio
           </button>
        </form>
      </div>
      {editingEspacio && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Editar Espacio</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEditarEspacio(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="usuario"
                value={editingEspacio.usuario}
                onChange={(e) => setEditingEspacio({ ...editingEspacio, usuario: e.target.value })}
                placeholder="Usuario"
                className="w-full p-2 border border-gray-300 rounded"
                list="usuarios"
              />
              <datalist id="usuarios">
                {usuarios.map((usuario, index) => (
                  <option key={index} value={usuario} />
                ))}
              </datalist>
            </div>
            <select
              name="espacio"
              value={editingEspacio.espacio}
              onChange={(e) => setEditingEspacio({ ...editingEspacio, espacio: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar Espacio</option>
              <option value="Pista de Tenis">Pista de Tenis</option>
              <option value="Pista de Padel">Pista de Padel</option>
              <option value="Sala de Yoga">Sala de Yoga</option>
              <option value="Sala de Pesas">Sala de Pesas</option>
              <option value="Piscina">Piscina</option>
            </select>
            <input
              type="date"
              name="fechaInicio"
              value={editingEspacio.fechaInicio}
              onChange={(e) => setEditingEspacio({ ...editingEspacio, fechaInicio: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="fechaFin"
              value={editingEspacio.fechaFin}
              onChange={(e) => setEditingEspacio({ ...editingEspacio, fechaFin: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              name="hora"
              value={editingEspacio.hora}
              onChange={(e) => setEditingEspacio({ ...editingEspacio, hora: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              name="estado"
              value={editingEspacio.estado}
              onChange={(e) => setEditingEspacio({ ...editingEspacio, estado: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar Estado</option>
              <option value="Disponible">Disponible</option>
              <option value="En Uso">En Uso</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Cerrado">Cerrado</option>
            </select>
            <TextFieldAdmin name="imagen" value={editingEspacio.imagen || ""} handleChange={(e) => setEditingEspacio({ ...editingEspacio, imagen: e.target.value })} placeholder="URL de la imagen" />
            <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] mt-4">
             Editar Espacio
          </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestionEspacios;