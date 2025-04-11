<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrenador extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';

    protected $fillable = [
        'especialidad',
        'experiencia',
        'disponibilidad',
        'entrenador_id',
        'phone_number',
        'certificaciones',
        'descripcion',
        'disponibilidad'
    ];

    protected $casts = [
        'disponibilidad' => 'array',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'entrenador_id');
    }

    public function valoraciones()
    {
        return $this->hasMany(ValoracionEntrenador::class, 'entrenador_id', 'id');
    }

    public function valoracionMedia()
    {
        return $this->valoraciones()->avg('puntuacion');
    }

}
