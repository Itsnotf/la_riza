<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saksi extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function kasus()
    {
        return $this->belongsToMany(Kasus::class, 'kasus_saksi');
    }

    public function kesaksian()
    {
        return $this->hasMany(Kesaksian::class);
    }
}
