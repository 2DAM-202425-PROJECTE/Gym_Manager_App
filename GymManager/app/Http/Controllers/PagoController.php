<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    /**
     * Mostra una llista del recurs.
     */
    public function index()
    {
        $pagos = Pago::all();
        return response()->json($pagos);
    }

    /**
     * Emmagatzema un recurs creat recentment a l'emmagatzematge.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'membresia_id' => 'required|exists:membresias,id',
            'tarifa_id' => 'required|exists:tarifas,id',
            'fecha_pago' => 'required|date',
            'estado' => 'required|in:pendiente,completado,fallido',
        ]);

        $pago = Pago::create($validatedData);
        return response()->json($pago, 201);
    }

    /**
     * Actualitzeu el recurs especificat a l'emmagatzematge.
     */
    public function update(Request $request, Pago $pago)
    {
        $validatedData = $request->validate([
            'membresia_id' => 'sometimes|required|exists:membresias,id',
            'tarifa_id' => 'sometimes|required|exists:tarifas,id',
            'fecha_pago' => 'sometimes|required|date',
            'estado' => 'sometimes|required|in:pendiente,completado,fallido',
        ]);

        $pago->update($validatedData);
        return response()->json($pago);
    }

    /**
     * Elimina el recurs especificat de l'emmagatzematge.
 */
    public function destroy(Pago $pago)
    {
        $pago->delete();
        return response()->json(null, 204);
    }
}
