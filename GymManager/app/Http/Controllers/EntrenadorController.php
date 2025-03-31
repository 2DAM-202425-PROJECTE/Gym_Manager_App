<?php

namespace App\Http\Controllers;

use App\Models\Entrenador;
use App\Models\User;
use Illuminate\Http\Request;

class EntrenadorController extends Controller
{
    public function index()
    {
        $entrenadores = Entrenador::with('user')->get()->toArray();
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
}
