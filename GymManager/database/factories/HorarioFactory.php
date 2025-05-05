<?php

namespace Database\Factories;

use App\Models\Horario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Horario>
 */
class HorarioFactory extends Factory
{
    protected $model = Horario::class;

    public function definition()
    {
        $horaInicio = $this->faker->time('H:i');
        $horaFin = Carbon::createFromFormat('H:i', $horaInicio)->addHours(2)->format('H:i');

        return [
            'dia' => $this->faker->randomElement(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']),
            'hora_inicio' => $horaInicio,
            'hora_fin' => $horaFin,
        ];
    }
}
