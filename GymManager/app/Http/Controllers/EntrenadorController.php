<?php

namespace App\Http\Controllers;

use App\Models\Entrenador;
use App\Models\User;
use App\Models\ValoracionEntrenador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntrenadorController extends Controller
{
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

        $validated_user_info = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $validated = $request->validate([
            'especialidad' => 'required|string',
            'experiencia' => 'required|string',
            'disponibilidad' => 'required|string',
            'phone_number' => 'required|numeric',
            'certificaciones' => 'required|string',
        ]);

        $client = User::create($validated_user_info, ['role' => 'trainer']);

        // Add the client id to the validated data
        $validated['entrenador_id'] = $client->id;

        $entrenador = Entrenador::create($validated);

        return response()->json($entrenador, 201);
    }

    public function show($id)
    {
        $entrenador = Entrenador::findOrFail($id);
        return response()->json($entrenador);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'especialidad' => 'string',
            'experiencia' => 'string',
            'disponibilidad' => 'string',
            'phone_number' => 'numeric',
            'certificaciones' => 'string',
            'descripcion' => 'string',
        ]);

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

        $validated['user_id'] = $user->id;

        ValoracionEntrenador::create($validated);

        return response()->json(['message' => 'Valoración añadida'], 201);
    }
}
