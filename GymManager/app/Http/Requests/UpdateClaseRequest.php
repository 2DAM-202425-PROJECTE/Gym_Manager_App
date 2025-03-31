<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClaseRequest extends FormRequest
{
    /**
     * Determinar si l'usuari està autoritzat per fer aquesta sol·licitud.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Obteniu les regles de validació que s'apliquen a la sol·licitud.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
