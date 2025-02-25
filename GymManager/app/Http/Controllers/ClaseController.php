<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaseRequest;
use App\Http\Requests\UpdateClaseRequest;
use App\Models\Clase;
use http\Client\Request;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clases = Clase::all();
        return response()->json($clases);
    }

    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'id_entrenador' => 'required|exists:entrenadores,id', // Asume que hay una tabla de entrenadores
            'maximo_participantes' => 'required|integer',
            'horarios' => 'required|array', // Asegura que sea un arreglo
            'horarios.*.dia' => 'required|string',
            'horarios.*.hora_inicio' => 'required|date_format:H:i',
            'horarios.*.hora_fin' => 'required|date_format:H:i|after:horarios.*.hora_inicio', // Valida que la hora de fin sea posterior a la de inicio
        ]);

        // Crear la clase
        $clase = Clase::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'],
            'id_entrenador' => $validated['id_entrenador'],
            'maximo_participantes' => $validated['maximo_participantes'],
        ]);

        \DB::beginTransaction();
        try {
            foreach ($validated['horarios'] as $horario) {
                $clase->horarios()->create([
                    'dia' => $horario['dia'],
                    'hora_inicio' => $horario['hora_inicio'],
                    'hora_fin' => $horario['hora_fin'],
                ]);
            }

            \DB::commit();

            return response()->json($clase, 201);
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['error' => 'No se pudo crear la clase'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Clase $clase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClaseRequest $request, Clase $clase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clase $clase)
    {
        //
    }
}
