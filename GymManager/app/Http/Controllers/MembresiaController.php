<?php
namespace App\Http\Controllers;

use App\Models\Membresia;
use BaconQrCode\Encoder\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MembresiaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'fecha_fin' => 'required|date',
        ]);

        $uuid = Str::uuid()->toString();

        $membresia = Membresia::create([
            'user_id' => $request->user_id,
            'fecha_fin' => $request->fecha_fin,
            'qr_data' => $uuid,
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
