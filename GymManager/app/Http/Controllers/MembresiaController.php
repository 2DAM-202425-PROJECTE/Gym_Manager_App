<?php
// app/Http/Controllers/MembresiaController.php
namespace App\Http\Controllers;

use App\Models\Membresia;
use Illuminate\Http\Request;

class MembresiaController extends Controller
{
    // Crear una nueva membresía
    public function store(Request $request)
    {
        // Validación de los datos
        $request->validate([
            'user_id' => 'required|exists:users,id', // Asegurarse de que el usuario existe
            'fecha_fin' => 'required|date',
            'estado' => 'required|boolean',
            'qr_data' => 'required|string',
        ]);

        // Crear la membresía
        $membresia = Membresia::create($request->all());

        return response()->json($membresia, 201); // Retornar la membresía recién creada
    }

    // Mostrar todas las membresías
    public function index()
    {
        $membresias = Membresia::all();
        return response()->json($membresias);
    }

    // Mostrar una membresía específica
    public function show($id)
    {
        $membresia = Membresia::findOrFail($id); // Obtener la membresía por ID
        return response()->json($membresia);
    }

    // Actualizar una membresía existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'fecha_fin' => 'required|date',
            'estado' => 'required|boolean',
            'qr_data' => 'required|string',
        ]);

        $membresia = Membresia::findOrFail($id); // Encontrar la membresía

        // Actualizar los campos
        $membresia->update($request->all());

        return response()->json($membresia);
    }

    // Eliminar una membresía
    public function destroy($id)
    {
        $membresia = Membresia::findOrFail($id);
        $membresia->delete();

        return response()->json(null, 204); // Respuesta sin contenido
    }
}
