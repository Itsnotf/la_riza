<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttachSaksiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'saksi_id' => 'required|array',
            'saksi_id.*' => 'exists:saksis,id'
        ];
    }
}
