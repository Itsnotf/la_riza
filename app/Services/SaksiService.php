<?php

namespace App\Services;

use App\Repositories\SaksiRepositoryInterface;

class SaksiService
{

    protected $SaksiRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(SaksiRepositoryInterface $SaksiRepository)
    {
        $this->SaksiRepository = $SaksiRepository;
    }

    public function getAllSaksi()
    {
        return $this->SaksiRepository->all();
    }

    public function createSaksi(array $data)
    {
        return $this->SaksiRepository->create($data);
    }

    public function findSaksi($id)
    {
        return $this->SaksiRepository->find($id);
    }

    public function updateSaksi($id, array $data)
    {
        return $this->SaksiRepository->update($id, $data);
    }

    public function deleteSaksi($id)
    {
        return $this->SaksiRepository->delete($id);
    }

}
