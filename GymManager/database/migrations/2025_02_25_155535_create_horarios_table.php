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
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clase_id')->constrained('clases')->onDelete('cascade'); // Relación con la tabla clases
            $table->string('dia'); // Día de la semana (lunes, martes, etc.)
            $table->time('hora_inicio'); // Hora de inicio
            $table->time('hora_fin'); // Hora de fin
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios');
    }
};
