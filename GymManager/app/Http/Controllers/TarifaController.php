<?php

namespace App\Http\Controllers;

use App\Models\Tarifa;
use Illuminate\Http\Request;

class TarifaController extends Controller
{
    /**
     * Mostra una llista del recurs.
     */
    public function index()
    {
        $tarifas = Tarifa::all();
        return response()->json($tarifas);
    }

    /**
     * Emmagatzema un recurs creat recentment a l'emmagatzematge.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'meses' => 'required|integer',
        ]);

        $tarifa = Tarifa::create($validatedData);
        return response()->json($tarifa, 201);
    }

    /**
     * Mostra el recurs especificat.
     */
    public function show(Tarifa $tarifa)
    {
        return response()->json($tarifa);
    }

    /**
     * Actualitza el recurs especificat a l'emmagatzematge.
     */
    public function update(Request $request, Tarifa $tarifa)
    {
        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'precio' => 'sometimes|required|numeric',
            'meses' => 'sometimes|required|integer',
        ]);

        $tarifa->update($validatedData);
        return response()->json($tarifa);
    }

    /**
     * Elimina el recurs especificat de l'emmagatzematge.
     */
    public function destroy(Tarifa $tarifa)
    {
        $tarifa->delete();
        return response()->json(null, 204);
    }
}
