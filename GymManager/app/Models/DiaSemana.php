<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DiaSemana extends Model
{
    // Si no usas timestamps en esta tabla
    public $timestamps = false;

    protected $table = 'dias_semana';

    protected $fillable = [
        'nombre',
    ];

    /**
     * Relación muchos a muchos con Entrenador.
     */
    public function entrenadores(): BelongsToMany
    {
        return $this->belongsToMany(Entrenador::class, 'disponibilidades_entrenadores');
    }
}
