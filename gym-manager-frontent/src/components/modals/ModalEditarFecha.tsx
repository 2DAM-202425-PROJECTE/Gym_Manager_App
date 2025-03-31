import { useState } from "react"
import apiClient from "../../api/prefijo"
import { toast } from "react-toastify"
import { User } from "../../pages/type/user"

interface ModalEditarFechaProps {
  user: User
  onClose: () => void
}

export function ModalEditarFecha({ user, onClose }: ModalEditarFechaProps) {
  const [newDate, setNewDate] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)

  const handleSave = async () => {
    try {
      console.log(newDate, amount)
      await apiClient.post(`/membresia/admin/${user.id}`, {
        user_id: user.id,
        fecha_fin: newDate,
        importe: amount
      });
      toast("Fecha de vencimiento actualizada");
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al actualizar la fecha de vencimiento");
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Editar Fecha de Vencimiento</h2>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Importe"
          className="border p-2 rounded mb-4 w-full"
        />
        <div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}