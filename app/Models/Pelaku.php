<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelaku extends Model
{
    protected $table = 'pelakus';

    protected $fillable = [
        'name',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'pekerjaan',
        'jenis_kelamin',
        'alamat',
        'status'

    ];

    public function kasus()
    {
        return $this->belongsToMany(Kasus::class, 'kasus_pelaku')
        ->withPivot('status');
    }

    public function pasals()
    {
        return $this->belongsToMany(Pasal::class, 'pasal_terlanggar')
                   ->withPivot('kasus_id');
    }

    public function interogasi()
    {
        return $this->hasMany(Interogasi::class);
    }
}
