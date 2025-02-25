<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaseRequest;
use App\Http\Requests\UpdateClaseRequest;
use App\Models\Clase;

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
        // Crear la clase
        $clase = Clase::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'id_entrenador' => $request->id_entrenador,
            'maximo_participantes' => $request->maximo_participantes,
        ]);

        // Crear los horarios asociados a la clase
        foreach ($request->horarios as $horario) {
            $clase->horarios()->create([
                'dia' => $horario['dia'],
                'hora_inicio' => $horario['hora_inicio'],
                'hora_fin' => $horario['hora_fin'],
            ]);
        }

        // Asignar participantes a la clase (si es necesario)
        if ($request->participantes) {
            $clase->participantes()->attach($request->participantes);
        }

        return response()->json($clase, 201);
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
