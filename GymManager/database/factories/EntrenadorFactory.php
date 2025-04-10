<?php

namespace Database\Factories;

use App\Models\Entrenador;
use App\Models\User;
use App\Models\DiaSemana;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entrenador>
 */
class EntrenadorFactory extends Factory
{
    protected $model = Entrenador::class;

    public function definition(): array
    {
        return [
            'entrenador_id' => User::factory(),
            'especialidad' => $this->faker->word,
            'experiencia' => $this->faker->numberBetween(1, 10),
            'phone_number' => $this->faker->phoneNumber,
            'certificaciones' => $this->faker->sentence,
            'descripcion' => $this->faker->paragraph,
        ];
    }

}
