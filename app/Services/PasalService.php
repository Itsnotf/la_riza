<?php

namespace App\Services;

use App\Repositories\PasalRepositoryInterface;

class PasalService
{

    protected $pasalRepository;

    public function __construct(PasalRepositoryInterface $pasalRepository)
    {
        $this->pasalRepository = $pasalRepository;
    }

    public function getAllPasal(){
        return $this->pasalRepository->all();
    }

    public function findPasal($id){
        return $this->pasalRepository->find($id);
    }

    public function createPasal(array $data){
        return $this->pasalRepository->create($data);
    }

    public function updatePasal($id, array $data){
        return $this->pasalRepository->update($id, $data);
    }

    public function deletePasal($id){
        return $this->pasalRepository->delete($id);
    }

}
