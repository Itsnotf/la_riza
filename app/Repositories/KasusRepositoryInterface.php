<?php

namespace App\Repositories;

interface KasusRepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function AllKasusPelaku($kasusId);
    public function attachPelaku($kasusId, $pelakuId);
    public function detachPelaku($kasusId, $pelakuId);
    public function findInterogasi($kasusId, $pelakuId);
    public function createInterogasi($kasusId, $pelakuId, array $data);
    public function findKesaksian($kasusId, $saksiId);
    public function createKesaksian($kasusId, $saksiId, array $data);
    public function AllPasal();
    public function createPasalTerlanggar($kasusId, $pelakuId, array $pasalIds);
    public function findPasalTerlanggar($kasusId, $pelakuId);
    public function updatePasalTerlanggar($kasusId, $pelakuId, array $pasalIds);
    public function updateStatus($kasusId, $pelakuId, $status);
    public function AllKasusSaksi($kasusId);
    public function attachSaksi($kasusId, $saksiId);
    public function detachSaksi($kasusId, $saksiId);
    public function AllKasusAnggota($kasusId);
    public function attachAnggota($kasusId, $anggotaId);
    public function detachAnggota($kasusId, $anggotaId);
}
