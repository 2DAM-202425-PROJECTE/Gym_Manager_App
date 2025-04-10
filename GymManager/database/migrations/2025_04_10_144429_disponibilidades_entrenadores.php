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
        Schema::create('disponibilidades_entrenadores', function (Blueprint $table) {
            $table->foreignId('entrenador_id')->constrained('entrenadors')->onDelete('cascade');
            $table->foreignId('dia_semana_id')->constrained('dia_semanas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disponibilidades_entrenadores');
    }
};
