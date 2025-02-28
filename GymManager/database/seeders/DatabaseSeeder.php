<?php

namespace Database\Seeders;

use App\Models\Clase;
use App\Models\Horario;
use App\Models\Tarifa;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Clase::truncate();
        User::truncate();
        User::factory(3)->create();


        // Crear un usuario normal
        User::factory()->create([
            'name' => 'Miquel Agudo',
            'email' => 'nomembresia@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // Crear un usuario con membresía
        $userWithMembresia = User::factory()->create([
            'name' => 'Oscar Fumador',
            'email' => 'membresia@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // Asignar membresía al usuario
        $userWithMembresia->membresia()->create([
            'user_id' => $userWithMembresia->id,
            'fecha_fin' => now()->addYear(),
            'qr_data' =>  Str::uuid()->toString(),
        ]);


        // Crear un administrador
        User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $clase = Clase::factory()->create();

        $horarios = [
            ['dia' => 'Lunes', 'hora_inicio' => '08:00', 'hora_fin' => '09:00', 'clase_id' => $clase->id],
            ['dia' => 'Miércoles', 'hora_inicio' => '08:00', 'hora_fin' => '09:00', 'clase_id' => $clase->id],
        ];

        foreach ($horarios as $horario) {
            Horario::create($horario);
        }
    }
}
