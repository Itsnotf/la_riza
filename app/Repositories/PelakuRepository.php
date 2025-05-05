<?php

namespace App\Repositories;

use App\Models\Pelaku;

class PelakuRepository implements PelakuRepositoryInterface
{

    public function all()
    {
        return Pelaku::all();
    }

    public function find($id)
    {
        return Pelaku::find($id);
    }

    public function create(array $data)
    {
        return Pelaku::create($data);
    }

    public function update($id, array $data)
    {
        $pelaku = $this->find($id);
        $pelaku->update($data);

        return $pelaku;
    }

    public function delete($id)
    {
        Pelaku::destroy($id);
    }
}
