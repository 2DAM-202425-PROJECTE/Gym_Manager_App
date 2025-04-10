<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('valoraciones_entrenadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entrenador_id')->constrained('entrenadors')->onDelete('cascade'); // Relación con entrenadors
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relación con users
            $table->integer('puntuacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
