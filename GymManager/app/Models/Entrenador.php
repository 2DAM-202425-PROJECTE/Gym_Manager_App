<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrenador extends Model
{
    use HasFactory;
    protected $primaryKey = 'entrenador_id';

    protected $fillable = [
        'especialidad',
        'experiencia',
        'disponibilidad',
        'phone_number',
        'certificaciones',
        'descripcion',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'entrenador_id');
    }

    public function diasDisponibles()
    {
        return $this->belongsToMany(DiaSemana::class, 'disponibilidades_entrenadores', 'entrenador_id', 'dia_semana_id');
    }

}
