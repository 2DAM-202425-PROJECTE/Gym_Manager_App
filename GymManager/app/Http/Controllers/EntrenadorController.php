<?php

namespace App\Http\Controllers;

use App\Models\Entrenador;
use App\Models\User;
use App\Models\ValoracionEntrenador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class EntrenadorController extends Controller
{
    public function trainer_info()
    {
        $user = Auth::user();

        $trainer = Entrenador::with('clases')->where('entrenador_id', $user->id)->first();

        if ($trainer) {
            $trainer->valoracion_media = $trainer->valoracionMedia() ?? 0; // Asegura que no sea null
        }

        return response()->json([
            'trainer' => $trainer,
        ]);
    }
    public function index()
    {
        $entrenadores = Entrenador::with('user')
            ->get()
            ->map(function ($entrenador) {
                $entrenador->valoracion_media = $entrenador->valoracionMedia() ?? 0; // Asegura que no sea null
                return $entrenador;
            });

        return response()->json($entrenadores);
    }

    public function store(Request $request)
    {
        try {
            // Validar datos del usuario
            $validated_user_info = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string',
            ]);

            $validated = $request->validate([
                'especialidad' => 'required|string',
                'experiencia' => 'required|string',
                'disponibilidad' => 'nullable|array',
                'disponibilidad.*' => 'string',
                'phone_number' => 'required|string',
                'certificaciones' => 'required|string',
                'descripcion' => 'nullable|string',
            ]);

            // Crear el usuario
            $user = User::create(array_merge($validated_user_info, ['role' => 'trainer']));

            // Asignar el permiso de trainer al usuario
            $user->givePermissionTo('trainer');

            // Crear el entrenador asociado al usuario
            $validated['entrenador_id'] = $user->id;
            $entrenador = Entrenador::create($validated);

            return response()->json($entrenador->load('user'));

        } catch (ValidationException $ve) {
            Log::error('Error de validación: ' . $ve->getMessage());
            return response()->json(['error' => 'Error de validación.', 'details' => $ve->errors()], 422);
        }
    }

    public function show($id)
    {
        $entrenador = Entrenador::findOrFail($id);
        return response()->json($entrenador);
    }

    public function update(Request $request, $id)
    {
        $validated_user_info = $request->validate([
            'name' => 'required|string',
        ]);

        $validated = $request->validate([
            'especialidad' => 'required|string',
            'experiencia' => 'required|integer',
            'disponibilidad' => 'nullable|array',
            'disponibilidad.*' => 'string',
            'phone_number' => 'required|string',
            'certificaciones' => 'required|string',
            'descripcion' => 'nullable|string',
        ]);


        $entrenador = Entrenador::findOrFail($id);
        $user = User::findOrFail($entrenador->entrenador_id);
        $user->update($validated_user_info);


        $entrenador = Entrenador::findOrFail($id);
        $entrenador->update($validated);

        return response()->json($entrenador);
    }

    public function destroy($id)
    {
        $entrenador = Entrenador::findOrFail($id);
        $entrenador->delete();
        return response()->json(null, 204);
    }

    public function valorar(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'puntuacion' => 'required|integer|min:1|max:5',
            'entrenador_id' => 'required|exists:entrenadors,id',
        ]);

        $existe = ValoracionEntrenador::where('user_id', $user->id)
            ->where('entrenador_id', $validated['entrenador_id'])
            ->exists();

        if ($existe) {
            return response()->json(['message' => 'Solo se permite una valoración por entrenador'], 409);
        }


        $validated['user_id'] = $user->id;

        $valoracion = ValoracionEntrenador::create($validated);

        return response()->json($valoracion, 201);
    }
}
