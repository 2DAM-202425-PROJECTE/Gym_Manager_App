<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clases = Clase::with('horarios')->get();
        return response()->json($clases);
    }

    public function store(Request $request)
    {
        try {
            // Validación de los datos recibidos
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'id_entrenador' => 'required|exists:users,id',
                'maximo_participantes' => 'required|integer',
                'horarios' => 'required|array',
                'horarios.*.dia' => 'required|string',
                'horarios.*.hora_inicio' => 'required|string',
                'horarios.*.hora_fin' => 'required|string',
            ]);

            // Crear la clase
            $clase = Clase::create([
                'nombre' => $validated['nombre'],
                'descripcion' => $validated['descripcion'],
                'id_entrenador' => $validated['id_entrenador'],
                'maximo_participantes' => $validated['maximo_participantes'],
            ]);

            // Insertar los horarios
            foreach ($validated['horarios'] as $horario) {
                $clase->horarios()->create([
                    'dia' => $horario['dia'],
                    'hora_inicio' => $horario['hora_inicio'],
                    'hora_fin' => $horario['hora_fin'],
                ]);
            }

            return response()->json($clase->load('horarios'), 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction(); // Iniciamos transacción para garantizar consistencia

            // Validar datos recibidos
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'id_entrenador' => 'required|exists:users,id',
                'maximo_participantes' => 'required|integer',
                'horarios' => 'required|array',
                'horarios.*.id' => 'nullable|exists:horarios,id', // ID opcional si ya existe
                'horarios.*.dia' => 'required|string',
                'horarios.*.hora_inicio' => 'required|string',
                'horarios.*.hora_fin' => 'required|string',
            ]);

            // Buscar la clase
            $clase = Clase::findOrFail($id);

            // Actualizar datos de la clase
            $clase->update([
                'nombre' => $validated['nombre'],
                'descripcion' => $validated['descripcion'],
                'id_entrenador' => $validated['id_entrenador'],
                'maximo_participantes' => $validated['maximo_participantes'],
            ]);

            // IDs de los horarios que se mantienen
            $horariosIds = collect($validated['horarios'])->pluck('id')->filter()->toArray();

            // Eliminar horarios que ya no están en la solicitud
            $clase->horarios()->whereNotIn('id', $horariosIds)->delete();

            // Recorrer los horarios para actualizar o crear nuevos
            foreach ($validated['horarios'] as $horario) {
                if (isset($horario['id'])) {
                    // Si tiene ID, actualizar
                    $clase->horarios()->where('id', $horario['id'])->update([
                        'dia' => $horario['dia'],
                        'hora_inicio' => $horario['hora_inicio'],
                        'hora_fin' => $horario['hora_fin'],
                    ]);
                } else {
                    // Si no tiene ID, crear nuevo
                    $clase->horarios()->create([
                        'dia' => $horario['dia'],
                        'hora_inicio' => $horario['hora_inicio'],
                        'hora_fin' => $horario['hora_fin'],
                    ]);
                }
            }

            DB::commit(); // Confirmar cambios

            return response()->json($clase->load('horarios'), 200);

        } catch (\Exception $e) {
            DB::rollBack(); // Revertir cambios en caso de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clase $clase)
    {
        //
    }
}
