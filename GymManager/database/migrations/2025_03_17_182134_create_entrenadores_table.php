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
        Schema::create('entrenadors', function (Blueprint $table) {
            // Definir el ID del entrenador como clave primaria
            $table->id(); // Clave primaria auto incrementada

            // Relación con la tabla 'users', asegurando que la clave foránea sea 'entrenador_id'
            $table->foreignId('entrenador_id')->constrained('users')->onDelete('cascade');
            $table->json('disponibilidad')->nullable();
            $table->string('especialidad');
            $table->integer('experiencia');
            $table->string('phone_number');
            $table->string('certificaciones', 255);
            $table->text('descripcion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrenadors');
    }
};
