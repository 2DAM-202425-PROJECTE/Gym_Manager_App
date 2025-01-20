<?php
// app/Http/Controllers/MembresiaController.php
namespace App\Http\Controllers;

use App\Models\Membresia;
use Illuminate\Http\Request;

class MembresiaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'fecha_fin' => 'required|date',
            'estado' => 'required|boolean',
            'qr_data' => 'required|string',
        ]);

        // Crear la membresía
        $membresia = Membresia::create($request->all());

        return response()->json($membresia, 201);
    }

    public function index()
    {
        $membresias = Membresia::all();
        return response()->json($membresias);
    }

    public function show($id)
    {
        $membresia = Membresia::findOrFail($id);
        return response()->json($membresia);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'fecha_fin' => 'required|date',
            'estado' => 'required|boolean',
            'qr_data' => 'required|string',
        ]);

        $membresia = Membresia::findOrFail($id);

        $membresia->update($request->all());

        return response()->json($membresia);
    }

    public function destroy($id)
    {
        $membresia = Membresia::findOrFail($id);
        $membresia->delete();

        return response()->json(null, 204);
    }
}
