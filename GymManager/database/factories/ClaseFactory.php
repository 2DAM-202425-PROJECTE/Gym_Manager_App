<?php

namespace Database\Factories;

use App\Models\Clase;
use App\Models\Horario;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clase>
 */
class ClaseFactory extends Factory
{
    protected $model = Clase::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->sentence(),
            'id_entrenador' => User::factory(),
            'maximo_participantes' => $this->faker->numberBetween(10, 30),
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Clase $clase) {
            // Crear entre 1 y 5 horarios para cada clase
            Horario::factory()->count($this->faker->numberBetween(1, 5))->create([
                'clase_id' => $clase->id,
            ]);
        });
    }
}
