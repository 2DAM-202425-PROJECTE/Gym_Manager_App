<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membresia extends Model
{
    /** @use HasFactory<\Database\Factories\MembresiaFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'fecha_fin',
        'qr_data',
    ];
    protected $appends = [
        'last_tarifa', // Ensure this accessor is included in JSON responses
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }
    public function getFechaFinAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getLastTarifaAttribute()
    {
        $lastPago = $this->pagos()->latest('fecha_pago')->first();
        return $lastPago ? $lastPago->tarifa : null;
    }
}
