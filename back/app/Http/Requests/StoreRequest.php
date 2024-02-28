<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'string',
            'importance' => 'integer',
            'deadline' => 'date|nullable',
            'status'=> 'string'
        ];
    }
}
