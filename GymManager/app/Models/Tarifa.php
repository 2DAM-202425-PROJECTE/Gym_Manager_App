<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
    protected $table = 'tarifas';
    use HasFactory;

    protected $fillable = [
        'nombre',
        'precio',
        'meses',
    ];

    protected $appends = [
        'cantidad_pagos',
    ];
    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }
    public function getCantidadPagosAttribute()
    {
        return $this->pagos()->count();
    }
}
