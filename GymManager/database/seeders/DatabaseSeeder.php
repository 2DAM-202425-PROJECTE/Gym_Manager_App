<?php

namespace Database\Seeders;

use App\helpers\RolesPermission;
use App\Models\Entrenador;
use App\Models\Membresia;
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
        membresia::truncate();
        Entrenador::truncate();
        Tarifa::truncate();

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
        $userWithMembresia->membresia()->create([
            'user_id' => $userWithMembresia->id,
            'fecha_fin' => now()->addYear(),
            'qr_data' => Str::uuid()->toString(),
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

        Tarifa::factory()->create();
    }
}
