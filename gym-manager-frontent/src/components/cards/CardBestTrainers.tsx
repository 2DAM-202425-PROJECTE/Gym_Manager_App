import { useEffect, useState } from "react";
import apiClient from "../../api/prefijo";
import { Entrenador } from "../../pages/type/entrenadors";

export default function CardBestTrainers() {
    const [trainers, setTrainers] = useState<Entrenador[]>([]);

    useEffect(() => {
        apiClient.get("/alltrainers")
            .then((response) => {
                const sortedTrainers = response.data
                    .sort((a: Entrenador, b: Entrenador) => b.valoracion_media - a.valoracion_media)
                    .slice(0, 3);
                setTrainers(sortedTrainers);
            })
            .catch((error) => console.error("Error fetching trainers:", error));
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            
            {trainers.map((trainer) => (
                <div
                    key={trainer.id}
                    className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-64 text-center"
                >
                    <h3 className="text-lg font-semibold mb-2">
                        {trainer.nombre_completo || "Entrenador"}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Especialidad: {trainer.especialidad}
                    </p>
                    <p className="text-sm text-gray-600">
                        Valoración Media: {trainer.valoracion_media.toFixed(1)}
                    </p>
                </div>
            ))}
        </div>
    );
}