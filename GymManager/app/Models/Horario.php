<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }
}
