import { TrendingUp, Trophy, Zap } from "lucide-react";
const workouts = [
  { calories: 200 },
  { calories: 300 },
  { calories: 250 },
  // Add more workout objects as needed
];
const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);


export default function HomeStats() {
   
    return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Visitas este mes</p>
          <p className="text-3xl font-bold text-gray-700">24</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <p className="text-sm text-green-600 mt-2">↑ 12% vs. mes pasado</p>
    </div>
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Calorías quemadas</p>
          <p className="text-3xl font-bold text-gray-700">{totalCalories}</p>
        </div>
        <div className="bg-orange-100 p-3 rounded-full">
          <Zap className="h-6 w-6 text-orange-600" />
        </div>
      </div>
      <p className="text-sm text-orange-600 mt-2">↑ 5% vs. semana pasada</p>
    </div>
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Nivel de membresía</p>
          <p className="text-3xl font-bold text-gray-700">Oro</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full">
          <Trophy className="h-6 w-6 text-yellow-600" />
        </div>
      </div>
      <p className="text-sm text-yellow-600 mt-2">50 puntos para Platino</p>
    </div>
  </div>)
}