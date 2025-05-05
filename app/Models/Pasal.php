<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasal extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pelanggar()
    {
        return $this->belongsToMany(Pelaku::class, 'pasal_terlanggar')
                    ->withPivot('kasus_id');
    }

}
