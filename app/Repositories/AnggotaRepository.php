<?php

namespace App\Repositories;

use App\Models\Anggota;

class AnggotaRepository implements AnggotaRepositoryInterface
{
    public function All()
    {
        return Anggota::all();
    }

    public function create(array $data)
    {
        return Anggota::create($data);
    }

    public function find($id)
    {
        return Anggota::find($id);
    }

    public function update($id, array $data)
    {
        $anggota = $this->find($id);
        $anggota->update($data);

        return $anggota;
    }

    public function delete($id)
    {
         Anggota::destroy($id);
    }
}
