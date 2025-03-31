<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClaseRequest extends FormRequest
{
    /**
     * Determineu si l'usuari està autoritzat per fer aquesta sol·licitud.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Obteniu les regles de validació que s'apliquen a la sol·licitudst.
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
