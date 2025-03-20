<?php

namespace Database\Seeders;

use App\Models\Entrenador;
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
        User::truncate();
        User::factory(10)->create();

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

        // Insertar entrenadores existentes en la tabla entrenadores
        $trainers = User::where('role', 'trainer')->get();
        foreach ($trainers as $trainer) {
            Entrenador::create([
                'entrenador_id' => $trainer->id,
                'especialidad' => 'default_specialty', // Reemplazar con datos reales
                'experiencia' => 'default_experience', // Reemplazar con datos reales
                'disponibilidad' => 'default_availability', // Reemplazar con datos reales
                'phone_number' => '1234567890', // Reemplazar con datos reales
                'certificaciones' => 'default_certifications', // Reemplazar con datos reales
                'descripcion' => 'default_descripcio.', // Reemplazar con datos reales
            ]);
        }
    }
}
