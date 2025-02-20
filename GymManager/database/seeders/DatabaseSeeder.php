<?php

namespace Database\Seeders;

use App\Models\Tarifa;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        User::factory(10)->create();
        Tarifa::factory(5)->create();
    }
}
