<?php
namespace App\Http\Controllers;

use App\Models\Membresia;
use App\Models\Pago;
use App\Models\Tarifa;
use BaconQrCode\Encoder\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MembresiaController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'tarifa_id' => 'required|exists:tarifas,id',
            'fecha_fin' => 'required|date',
        ]);

        $membresia = Membresia::where('user_id', $request->user_id)->first();

        if ($membresia) {
            $membresia->fecha_fin = $request->fecha_fin;
            $membresia->save();
        } else {
            $uuid = Str::uuid()->toString();
            $membresia = Membresia::create([
                'user_id' => $request->user_id,
                'fecha_fin' => $request->fecha_fin,
                'qr_data' => $uuid,
            ]);
        }
        Pago::create([
            'membresia_id' => $membresia->id,
            'tarifa_id' => $request->tarifa_id,
            'fecha_pago' => now(),
            'estado' => 'completado',
        ]);
        // Devolver la respuesta
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
    public function create_admin_membresia(Request $request, $id)
    {
        $request->validate([
            'id_membresia' => 'nullable|exists:membresias,id',
            'amount' => 'required|numeric',
            'fecha_fin' => 'required|date',
        ]);



        $membresia = Membresia::findOrFail($id);

        if (!$membresia){

            $newMembresia = Membresia::factory([
                'user_id' => $request->user_id,
                'fecha_fin' => $request->fecha_fin,
                'qr_data' => $request->qr_data,
            ]);

            Pago::create([
                'membresia_id' => $newMembresia->id,
                'fecha_pago' => now(),
                'estado' => 'completado',
            ]);
        }else{
            $membresia->fecha_fin = $request->fecha_fin;
            Pago::create([
                'membresia_id' => $membresia->id,
                'fecha_pago' => now(),
                'estado' => 'completado',
            ]);
            $membresia->save();
        }

    }
}
