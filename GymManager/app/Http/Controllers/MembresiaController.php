<?php
namespace App\Http\Controllers;

use App\Models\Membresia;
use BaconQrCode\Encoder\QrCode;
use Illuminate\Http\Request;

class MembresiaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'fecha_fin' => 'required|date',
            'estado' => 'required|boolean',
        ]);

        // Generar los datos del QR antes de crear la membresía
        $qrData = QrCode::format('png')
            ->size(300)
            ->generate("User ID: {$request->user_id}, Fecha Fin: {$request->fecha_fin}");

        // Crear la membresía con todos los datos, incluido el QR
        $membresia = Membresia::create([
            'user_id' => $request->user_id,
            'fecha_fin' => $request->fecha_fin,
            'estado' => $request->estado,
            'qr_data' => base64_encode($qrData), // Guardar el QR codificado en base64
        ]);

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
