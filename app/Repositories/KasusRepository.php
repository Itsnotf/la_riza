<?php

namespace App\Repositories;

use App\Models\Interogasi;
use App\Models\Kasus;
use App\Models\Kesaksian;
use App\Models\Pasal;
use App\Models\Pelaku;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class KasusRepository implements KasusRepositoryInterface
{
    /**
     * Get all cases.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return Kasus::all();
    }

    /**
     * Find a case by ID.
     *
     * @param  int  $id
     * @return \App\Models\Kasus|null
     */
    public function find($id)
    {
        return Kasus::find($id);
    }

    /**
     * Create a new case.
     *
     * @param  array  $data
     * @return \App\Models\Kasus
     */
    public function create(array $data)
    {
        return Kasus::create($data);
    }

    /**
     * Update an existing case.
     *
     * @param  int  $id
     * @param  array  $data
     * @return \App\Models\Kasus
     */
    public function update($id, array $data)
    {
        $kasus = $this->find($id);
        $kasus->update($data);

        return $kasus;
    }

    /**
     * Delete a case.
     *
     * @param  int  $id
     * @return bool|null
     */
    public function delete($id)
    {
        return Kasus::destroy($id);
    }

    public function attachPelaku($kasusId, $pelakuId)
    {
        $kasus = $this->find($kasusId);
        $kasus->pelakus()->attach($pelakuId);
    }

    public function detachPelaku($kasusId, $pelakuId)
    {
        $kasus = $this->find($kasusId);
        $kasus->pelakus()->detach($pelakuId);
    }

    public function AllKasusPelaku($kasusId)
    {
        return Kasus::with('pelakus')->findOrFail($kasusId);
    }

    public function findInterogasi($kasusId, $pelakuId)
    {
        $exists = Kasus::where('id', $kasusId)
                    ->whereHas('pelakus', function($query) use ($pelakuId) {
                        $query->where('pelaku_id', $pelakuId);
                    })
                    ->exists();

        if (!$exists) {
            return null;
        }

        return Interogasi::where('kasus_id', $kasusId)
                        ->where('pelaku_id', $pelakuId)
                        ->first();
    }

    public function createInterogasi($kasusId, $pelakuId, array $data)
    {

        $interogasi = $this->findInterogasi($kasusId, $pelakuId);

        $buktiPath = $interogasi->bukti ?? null;

        if (isset($data['bukti']) && $data['bukti'] instanceof \Illuminate\Http\UploadedFile) {
            if ($interogasi && $interogasi->bukti) {
                Storage::disk('public')->delete($interogasi->bukti);
            }

            $buktiPath = $data['bukti']->store('bukti_interogasi', 'public');
        }

        if ($interogasi) {
            $interogasi->update([
                'deskripsi' => $data['deskripsi'],
                'bukti' => $buktiPath,
            ]);
        }
        else {
            $interogasi = Interogasi::create([
                'kasus_id' => $kasusId,
                'pelaku_id' => $pelakuId,
                'deskripsi' => $data['deskripsi'],
                'bukti' => $buktiPath,
            ]);
        }

        return $interogasi;
    }

    public function AllPasal()
    {
        return Pasal::all();
    }

    public function createPasalTerlanggar($kasusId, $pelakuId, array $pasalIds)
    {
        $pelaku = Pelaku::find($pelakuId);

        foreach ($pasalIds as $pasalId) {
            $pelaku->pasals()->attach($pasalId, ['kasus_id' => $kasusId]);
        }
    }

    public function findPasalTerlanggar($kasusId, $pelakuId)
    {
        $pelaku = Pelaku::findOrFail($pelakuId);

        return $pelaku->pasals()
                    ->wherePivot('kasus_id', $kasusId)
                    ->get();
    }

    public function updatePasalTerlanggar($kasusId, $pelakuId, array $pasalIds)
    {
        if (!is_array($pasalIds)) {
            throw new \InvalidArgumentException('Pasal IDs must be an array');
        }

        $pelaku = Pelaku::findOrFail($pelakuId);

        Kasus::findOrFail($kasusId);

        return DB::transaction(function() use ($pelaku, $kasusId, $pasalIds) {
            $pelaku->pasals()
                ->wherePivot('kasus_id', $kasusId)
                ->detach();

            if (!empty($pasalIds)) {
                $pelaku->pasals()
                    ->attach(array_fill_keys($pasalIds, ['kasus_id' => $kasusId]));
            }

            return true;
        });
    }

    public function updateStatus($kasusId, $pelakuId, $status)
    {
        $kasus = Kasus::findOrFail($kasusId);

        $kasus->pelakus()->updateExistingPivot($pelakuId, [
            'status' => $status
        ]);

        return true;
    }

    public function attachSaksi($kasusId, $saksiId)
    {
        $kasus = $this->find($kasusId);
        $kasus->saksis()->attach($saksiId);
    }

    public function detachSaksi($kasusId, $saksiId)
    {
        $kasus = $this->find($kasusId);
        $kasus->saksis()->detach($saksiId);
    }

    public function AllKasusSaksi($kasusId)
    {
        return Kasus::with('saksis')->findOrFail($kasusId);

    }

    public function  createKesaksian($kasusId, $saksiId, array $data)
    {
        $kesaksian = $this->findKesaksian($kasusId, $saksiId);

        $buktiPath = $kesaksian->bukti ?? null;

        if (isset($data['bukti']) && $data['bukti'] instanceof \Illuminate\Http\UploadedFile) {
            if ($kesaksian && $kesaksian->bukti) {
                Storage::disk('public')->delete($kesaksian->bukti);
            }

            $buktiPath = $data['bukti']->store('bukti_kesaksian', 'public');
        }

        if ($kesaksian) {
            $kesaksian->update([
                'deskripsi' => $data['deskripsi'],
                'ikatan' => $data['ikatan'],
                'bukti' => $buktiPath,
            ]);
        }
        else {
            $kesaksian = Kesaksian::create([
                'kasus_id' => $kasusId,
                'saksi_id' => $saksiId,
                'deskripsi' => $data['deskripsi'],
                'ikatan' => $data['ikatan'],
                'bukti' => $buktiPath,
            ]);
        }

        return $kesaksian;
    }

    public function findKesaksian($kasusId, $saksiId)
    {
        $exists = Kasus::where('id', $kasusId)
                    ->whereHas('saksis', function($query) use ($saksiId) {
                        $query->where('saksi_id', $saksiId);
                    })
                    ->exists();

        if (!$exists) {
            return null;
        }

        return Kesaksian::where('kasus_id', $kasusId)
                        ->where('saksi_id', $saksiId)
                        ->first();
    }

    public function attachAnggota($kasusId, $anggotaId)
    {
        $kasus = $this->find($kasusId);
        $kasus->anggotas()->attach($anggotaId);
    }

    public function detachAnggota($kasusId, $anggotaId)
    {
        $kasus = $this->find($kasusId);
        $kasus->anggotas()->detach($anggotaId);
    }

    public function AllKasusAnggota($kasusId)
    {
        return Kasus::with('anggotas')->findOrFail($kasusId);

    }
}

