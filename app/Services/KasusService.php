<?php

namespace App\Services;

use App\Repositories\KasusRepositoryInterface;

class KasusService
{
    protected $kasusRepository;

    public function __construct(KasusRepositoryInterface $kasusRepository)
    {
        $this->kasusRepository = $kasusRepository;
    }

    public function getAllKasus()
    {
        return $this->kasusRepository->all();
    }

    public function findKasus($id)
    {
        return $this->kasusRepository->find($id);
    }

    public function createKasus(array $data)
    {
        return $this->kasusRepository->create($data);
    }

    public function updateKasus($id, array $data)
    {
        return $this->kasusRepository->update($id, $data);
    }

    public function deleteKasus($id)
    {
        return $this->kasusRepository->delete($id);
    }

    public function attachPelaku($kasusId, $pelakuId) {
        return $this->kasusRepository->attachPelaku($kasusId, $pelakuId);
    }

    public function detachPelaku($kasusId, $pelakuId) {
        return $this->kasusRepository->detachPelaku($kasusId, $pelakuId);
    }

    public function AllKasusPelaku($kasusId){
        return $this->kasusRepository->AllKasusPelaku($kasusId);
    }

    public function findInterogasi($kasusId, $pelakuId)
    {
        return $this->kasusRepository->findInterogasi($kasusId, $pelakuId);
    }

    public function createInterogasi($kasusId, $pelakuId, array $data)
    {
        return $this->kasusRepository->createInterogasi($kasusId, $pelakuId, $data);
    }

    public function getAllPasals()
    {
        return $this->kasusRepository->AllPasal();
    }

    public function createPasalTerlanggar($kasusId, $pelakuId, array $pasalIds)
    {
        return $this->kasusRepository->createPasalTerlanggar($kasusId, $pelakuId, $pasalIds);
    }

    public function findPasalTerlanggar($kasusId, $pelakuId)
    {
        return $this->kasusRepository->findPasalTerlanggar($kasusId, $pelakuId);
    }

    public function updatePasalTerlanggar($kasusId, $pelakuId, array $pasalIds)
    {
        return $this->kasusRepository->updatePasalTerlanggar($kasusId, $pelakuId, $pasalIds);
    }

    public function updateStatus($kasusId, $pelakuId, $status){
        return $this->kasusRepository->updateStatus($kasusId,$pelakuId,$status);
    }

    public function attachSaksi($kasusId, $pelakuId) {
        return $this->kasusRepository->attachSaksi($kasusId, $pelakuId);
    }

    public function detachSaksi($kasusId, $saksiId) {
        return $this->kasusRepository->detachSaksi($kasusId, $saksiId);
    }

    public function AllKasusSaksi($kasusId){
        return $this->kasusRepository->AllKasusSaksi($kasusId);
    }

    public function findKesaksian($kasusId, $saksiId)
    {
        return $this->kasusRepository->findKesaksian($kasusId, $saksiId);
    }

    public function createKesaksian($kasusId, $saksiId, array $data)
    {
        return $this->kasusRepository->createKesaksian($kasusId, $saksiId, $data);
    }

    public function attachAnggota($kasusId, $anggotaId) {
        return $this->kasusRepository->attachAnggota($kasusId, $anggotaId);
    }

    public function detachAnggota($kasusId, $anggotaId) {
        return $this->kasusRepository->detachAnggota($kasusId, $anggotaId);
    }

    public function AllKasusAnggota($kasusId){
        return $this->kasusRepository->AllKasusAnggota($kasusId);
    }


}
