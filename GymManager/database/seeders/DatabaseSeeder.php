<?php

namespace Database\Seeders;

use App\helpers\RolesPermission;
use App\Models\Clase;
use App\Models\Entrenador;
use App\Models\Membresia;
use App\Models\Pago;
use App\Models\Tarifa;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key constraints
        DB::statement('PRAGMA foreign_keys = OFF;');

        // Truncate tables
        Permission::query()->delete();
        Role::query()->delete();
        User::truncate();
        Membresia::truncate();
        Entrenador::truncate();
        Tarifa::truncate();
        Clase::truncate();
        Pago::truncate();


        // Enable foreign key constraints
        DB::statement('PRAGMA foreign_keys = ON;');

        // Seed data
        User::factory(10)->create();

        RolesPermission::registerPolicies();

        // Create a regular user
        User::factory()->create([
            'name' => 'Miquel Agudo',
            'email' => 'nomembresia@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // Create a user with membership
        $userWithMembresia = User::factory()->create([
            'name' => 'Oscar Fumador',
            'email' => 'membresia@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        // Assign membership to the user
        $tarifa = Tarifa::create([
            'nombre' => 'Tarifa Básica',
            'precio' => 100.00,
            'meses' => 12,
        ]);

// Create the membership first
        $membresia = $userWithMembresia->membresia()->create([
            'user_id' => $userWithMembresia->id,
            'fecha_fin' => now()->addMonths(12), // Assuming 12 months for the membership
            'qr_data' => Str::uuid()->toString(),
        ]);

// Create the payment associated with the membership and tariff
        $pago = Pago::create([
            'membresia_id' => $membresia->id, // Use the created membership ID
            'tarifa_id' => $tarifa->id,
            'fecha_pago' => now(),
            'estado' => 'completado',
        ]);

// Actualizar el pago con la membresía creada
        $pago->update([
            'membresia_id' => $membresia->id,
        ]);

        // Create an administrator
        $user = User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $user->givePermissionTo('admin');

        Entrenador::factory(5)->create();

        Tarifa::factory(2)->create();
        Pago::factory(5)->create();
        Clase::factory(5)->create();
    }
}
