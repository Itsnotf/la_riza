<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interogasi extends Model
{
    use HasFactory;

    protected $guarded = ["'id"];

    public function kasus()
    {
        return $this->belongsTo(Kasus::class);
    }

    public function pelaku()
    {
        return $this->belongsTo(Pelaku::class);
    }
}
