import { useState } from "react";
import { Clase, Horario } from "../../pages/type/clases";
import { BlueButtonAdmin } from "../buttons/BlueButtonAdmin";
import { GreenButtonAdmin } from "../buttons/GreenButtonAdmin";

export function HandleViewHorario({horarios, editingClass, setEditingClass} : {horarios : Horario[] | null; editingClass : Clase | null; setEditingClass: React.Dispatch<React.SetStateAction<Clase | null>>}) {
    const [horarioToModify , setHorarioToModify] = useState<Horario | null>(null) 

    const handleModifyHorario = (horario : Horario) => {
        setHorarioToModify(horario)
    }

    const handleSaveHorario = (horario : Horario) => {
        setHorarioToModify(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (!horarioToModify) return;
        setHorarioToModify({ ...horarioToModify, [field]: e.target.value });
    };

    if (!horarios) return null;
    return (
        <div className="w-full">
            <h3 className="text-xl font-bold mb-4 text-[#092756]">Horarios</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-[#E1E8F1]">
                    <thead>
                        <tr className="bg-[#F1F5F9]">
                            <th className="p-3 text-left">Día</th>
                            <th className="p-3 text-left">Hora Inicio</th>
                            <th className="p-3 text-left">Hora Fin</th>
                            <th className="p-3 text-left">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        !horarioToModify ? 
                        horarios.map((horario : Horario) => (
                            <tr key={horario.id} className="border-b">
                                <td className="p-3">{horario.dia}</td>
                                <td className="p-3">{horario.hora_inicio}</td>
                                <td className="p-3">{horario.hora_fin}</td>
                                <td className="p-3">
                                    <BlueButtonAdmin text="Modificar" action={() => handleModifyHorario(horario)} />
                                </td>
                            </tr>
                        ))
                        :
                        horarios.map((horario : Horario) => (
                            <tr key={horario.id} className="border-b">
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={horarioToModify.dia}
                                        onChange={(e) => handleChange(e, 'dia')}
                                        className="border p-1 w-full"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={horarioToModify.hora_inicio}
                                        onChange={(e) => handleChange(e, 'hora_inicio')}
                                        className="border p-1 w-full"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={horarioToModify.hora_fin}
                                        onChange={(e) => handleChange(e, 'hora_fin')}
                                        className="border p-1 w-full"
                                    />
                                </td>
                                <td className="p-3">
                                    <GreenButtonAdmin text="Guardar" action={() => handleSaveHorario(horario)} />
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}