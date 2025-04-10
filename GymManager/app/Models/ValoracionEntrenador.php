<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValoracionEntrenador extends Model
{
    use HasFactory;

    protected $table = 'valoraciones_entrenadores';

    protected $fillable = [
        'entrenador_id',
        'user_id',
        'puntuacion',
    ];

    public function entrenador()
    {
        return $this->belongsTo(Entrenador::class, 'entrenador_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
