import { useState } from "react";
import { Apple, Carrot, Fish, Egg } from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";

type MealPlan = {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function NutritionPage() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  const mealPlans: MealPlan[] = [
    {
      id: 1,
      name: "Plan de Pérdida de Peso",
      description: "Ideal para reducir grasa corporal",
      calories: 1800,
      protein: 120,
      carbs: 150,
      fat: 60,
    },
    {
      id: 2,
      name: "Plan de Ganancia Muscular",
      description: "Perfecto para aumentar masa muscular",
      calories: 2500,
      protein: 180,
      carbs: 250,
      fat: 70,
    },
    {
      id: 3,
      name: "Plan de Mantenimiento",
      description: "Mantén tu peso y forma física actual",
      calories: 2200,
      protein: 110,
      carbs: 220,
      fat: 65,
    },
    {
      id: 4,
      name: "Plan Vegetariano",
      description: "Nutrición balanceada sin carne",
      calories: 2000,
      protein: 80,
      carbs: 240,
      fat: 65,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <Sidebar></Sidebar>
        <div className="p-8 flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Planes de Nutrición</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {mealPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer transition-all ${
                    selectedPlan?.id === plan.id ? "border-2 border-maroon-600" : ""
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <h3 className="text-xl font-semibold text-maroon-600 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{plan.calories} kcal</span>
                    <span>{plan.protein}g proteína</span>
                    <span>{plan.carbs}g carbohidratos</span>
                    <span>{plan.fat}g grasa</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {selectedPlan ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-maroon-600 mb-4">{selectedPlan.name}</h3>
                  <p className="text-gray-600 mb-6">{selectedPlan.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-maroon-100 rounded-lg p-4 flex items-center">
                      <Apple className="h-8 w-8 text-maroon-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Calorías</p>
                        <p className="text-lg font-semibold text-maroon-600">{selectedPlan.calories} kcal</p>
                      </div>
                    </div>
                    <div className="bg-maroon-100 rounded-lg p-4 flex items-center">
                      <Fish className="h-8 w-8 text-maroon-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Proteína</p>
                        <p className="text-lg font-semibold text-maroon-600">{selectedPlan.protein}g</p>
                      </div>
                    </div>
                    <div className="bg-maroon-100 rounded-lg p-4 flex items-center">
                      <Carrot className="h-8 w-8 text-maroon-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Carbohidratos</p>
                        <p className="text-lg font-semibold text-maroon-600">{selectedPlan.carbs}g</p>
                      </div>
                    </div>
                    <div className="bg-maroon-100 rounded-lg p-4 flex items-center">
                      <Egg className="h-8 w-8 text-maroon-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Grasas</p>
                        <p className="text-lg font-semibold text-maroon-600">{selectedPlan.fat}g</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Solicitar Plan Personalizado
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-full">
                  <p className="text-xl text-gray-500">Selecciona un plan para ver más detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}