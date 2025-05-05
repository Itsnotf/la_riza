<?php

namespace App\Services;

use App\Repositories\AnggotaRepositoryInterface;

class AnggotaService
{

    protected $AnggotaRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(AnggotaRepositoryInterface $AnggotaRepository)
    {
        $this->AnggotaRepository = $AnggotaRepository;
    }

    public function getAllAnggota()
    {
        return $this->AnggotaRepository->all();
    }

    public function createAnggota(array $data)
    {
        return $this->AnggotaRepository->create($data);
    }

    public function findAnggota($id)
    {
        return $this->AnggotaRepository->find($id);
    }

    public function updateAnggota($id, array $data)
    {
        return $this->AnggotaRepository->update($id, $data);
    }

    public function deleteAnggota($id)
    {
        return $this->AnggotaRepository->delete($id);
    }

}
