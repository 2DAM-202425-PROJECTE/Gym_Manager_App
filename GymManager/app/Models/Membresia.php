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

    public function getFechaFinAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
