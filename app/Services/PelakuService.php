<?php

namespace App\Services;

use App\Repositories\PelakuRepositoryInterface;

class PelakuService
{
    protected $pelakuRepository;

    public function __construct(PelakuRepositoryInterface $pelakuRepository)
    {
        $this->pelakuRepository = $pelakuRepository;
    }

    public function getAllPelaku()
    {
        return $this->pelakuRepository->all();
    }

    public function findPelaku($id)
    {
        return $this->pelakuRepository->find($id);
    }

    public function createPelaku(array $data)
    {
        return $this->pelakuRepository->create($data);
    }

    public function updatePelaku($id, array $data)
    {
        return $this->pelakuRepository->update($id, $data);
    }

    public function deletePelaku($id)
    {
        return $this->pelakuRepository->delete($id);
    }
}
