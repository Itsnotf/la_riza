<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kasus extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kasus',
        'kronologi',
        'tanggal',
    ];

    public function pelakus()
    {
        return $this->belongsToMany(Pelaku::class, 'kasus_pelaku')
                   ->withPivot('status');
    }

    public function saksis()
    {
        return $this->belongsToMany(Saksi::class, 'kasus_saksi');
    }

    public function anggotas()
    {
        return $this->belongsToMany(Anggota::class, 'kasus_anggota');
    }


    public function pasals()
    {
        return $this->belongsToMany(Pasal::class, 'pasal_terlanggar')
                   ->withPivot('pelaku_id');
    }

    public function intogerasi()
    {
        return $this->hasMany(Interogasi::class);
    }

    public function kesaksian()
    {
        return $this->hasMany(Kesaksian::class);
    }


}
