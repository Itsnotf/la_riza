<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttachAnggotaRequest;
use App\Http\Requests\AttachPelakuRequest;
use App\Http\Requests\AttachSaksiRequest;
use App\Http\Requests\PasalTerlanggarRequest;
use App\Http\Requests\StoreInterogasiRequest;
use App\Http\Requests\StoreKasusRequest;
use App\Http\Requests\StoreKesaksianRequest;
use App\Http\Requests\UpdateKasusRequest;
use App\Http\Requests\UpdateStatusPelakuRequest;
use App\Models\Anggota;
use App\Models\Kasus;
use App\Models\Pelaku;
use App\Models\Saksi;
use App\Services\KasusService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class KasusController extends Controller
{

    protected $KasusService;
    /**
     * Display a listing of the resource.
     */
    public function __construct(KasusService $KasusService)
    {
        $this->KasusService = $KasusService;
    }

    public function index()
    {
        $kasus = $this->KasusService->getAllKasus();

        return Inertia::render('kasus/index', [
            'kasus' => $kasus,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('kasus/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKasusRequest $request)
    {

        $this->KasusService->createKasus($request->validated());

        return redirect()->route('kasus.index')->with('success', 'Kasus created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kasus $kasus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $kasus = $this->KasusService->findKasus($id);

        return Inertia::render('kasus/edit', [
            'kasus' => $kasus,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKasusRequest $request, string $id)
    {

        $this->KasusService->updateKasus($id, $request->validated());

        return redirect()->route('kasus.index')->with('success', 'Kasus updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->KasusService->deleteKasus($id);

        return redirect()->route('kasus.index')->with('success', 'Kasus deleted successfully.');
    }

    public function AllKasusPelaku(string $kasusId) {

        $kasus = $this->KasusService->AllKasusPelaku($kasusId);

        return Inertia::render('kasus/pelaku/index', [
            'pelaku' => $kasus->pelakus,
            'kasusId' => $kasus->id,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);

    }

    public function createPelaku(string $kasusId){
        $kasus = $this->KasusService->findKasus($kasusId);
        $pelakus = Pelaku::get();
        return Inertia::render('kasus/pelaku/create',[
            'existingPelakus' => $kasus->pelakus,
            'kasusId' => $kasusId,
            'pelakus' => $pelakus
        ]);
    }

    public function attachPelaku(string $kasusId, AttachPelakuRequest $request)
    {
        $this->KasusService->attachPelaku($kasusId, $request->pelaku_id);
        return redirect()->route('kasusPelaku', ['kasusId' => $kasusId])
                     ->with('success', 'Pelaku attached successfully.');
    }

    public function detachPelaku(string $kasusId, string $pelakuId)
    {

        $this->KasusService->detachPelaku($kasusId, $pelakuId);

        return redirect()->route('kasusSaksi', ['kasusId' => $kasusId])
        ->with('success', 'Pelaku Detach successfully.');
    }

    public function findInterogasi($kasusId, $pelakuId)
    {
        $interogasi = $this->KasusService->findInterogasi($kasusId, $pelakuId);

        return Inertia::render('kasus/pelaku/interogasi', [
            'kasusId' => $kasusId,
            'pelakuId' => $pelakuId,
            'interogasi' => $interogasi,
        ]);
    }

    public function createInterogasi($kasusId, $pelakuId, StoreInterogasiRequest $request )
    {
        $this->KasusService->createInterogasi($kasusId, $pelakuId, $request->validated());
        return redirect()
        ->route('kasusPelaku', $kasusId)->with('success', 'Interogasi Pelaku berhasil dibuat');
    }

    public function pasalTerlanggar($kasusId, $pelakuId)
    {
        $pasals = $this->KasusService->getAllPasals();
        $pasalTerlanggars = $this->KasusService->findPasalTerlanggar($kasusId, $pelakuId);

        return Inertia::render('kasus/pelaku/pasal', [
            'kasusId' => $kasusId,
            'pelakuId' => $pelakuId,
            'pasals' => $pasals,
            'pasalTerlanggars' => $pasalTerlanggars
        ]);
    }

    public function updatePasalTerlanggar( $kasusId, $pelakuId, PasalTerlanggarRequest $request)
    {
       $this->KasusService->updatePasalTerlanggar($kasusId, $pelakuId, $request->pasal_id);

        return redirect()->route('kasusPelaku', $kasusId)->with('success', 'Pasal attached successfully.');

    }

    public function updateStatus($kasusId, $pelakuId, UpdateStatusPelakuRequest $request)
    {
         $this->KasusService->updateStatus($kasusId,$pelakuId,$request['status']);

         return redirect()->back();
    }

    public function AllKasusSaksi(string $kasusId) {

        $kasus = $this->KasusService->AllKasusSaksi($kasusId);

        return Inertia::render('kasus/saksi/index', [
            'saksis' => $kasus->saksis,
            'kasusId' => $kasus->id,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);

    }

    public function createSaksi(string $kasusId)
    {
        $kasus = $this->KasusService->findKasus($kasusId);
        $saksis = Saksi::get();
        return Inertia::render('kasus/saksi/create',[
            'existingSaksis' => $kasus->saksis,
            'kasusId' => $kasusId,
            'saksis' => $saksis
        ]);
    }

    public function attachSaksi(string $kasusId, AttachSaksiRequest $request)
    {
        $this->KasusService->attachSaksi($kasusId, $request->saksi_id);
        return redirect()->route('kasusSaksi', ['kasusId' => $kasusId])->with('success', 'Saksi attached successfully.');
    }

    public function detachSaksi(string $kasusId, string $saksiId)
    {

        $this->KasusService->detachSaksi($kasusId, $saksiId);

        return redirect()->route('kasusSaksi', ['kasusId' => $kasusId])->with('success', 'Saksi Detach successfully.');
    }

    public function findKesaksian($kasusId, $saksiId)
    {
        $kesaksian = $this->KasusService->findKesaksian($kasusId, $saksiId);

        return Inertia::render('kasus/saksi/kesaksian', [
            'kasusId' => $kasusId,
            'saksiId' => $saksiId,
            'kesaksian' => $kesaksian,
        ]);
    }

    public function createKesaksian($kasusId, $saksiId, StoreKesaksianRequest $request )
    {
        $this->KasusService->createKesaksian($kasusId, $saksiId, $request->validated());
        return redirect()->route('kasusSaksi', $kasusId)->with('success', 'Kesaksian Saksi berhasil dibuat');
    }






    public function AllKasusAnggota(string $kasusId) {

        $kasus = $this->KasusService->AllKasusAnggota($kasusId);

        return Inertia::render('kasus/anggota/index', [
            'anggotas' => $kasus->anggotas,
            'kasusId' => $kasus->id,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);

    }

    public function createAnggota(string $kasusId){
        $kasus = $this->KasusService->findKasus($kasusId);
        $anggotas = Anggota::get();
        return Inertia::render('kasus/anggota/create',[
            'existingAnggota' => $kasus->anggotas,
            'kasusId' => $kasusId,
            'anggotas' => $anggotas
        ]);
    }

    public function attachAnggota(string $kasusId, AttachAnggotaRequest $request)
    {
        $this->KasusService->attachAnggota($kasusId, $request->anggota_id);

        return redirect()->route('kasusAnggota', ['kasusId' => $kasusId])
                     ->with('success', 'Anggota attached successfully.');
    }

    public function detachAnggota(string $kasusId, string $anggotaId)
    {

        $this->KasusService->detachAnggota($kasusId, $anggotaId);

        return redirect()->route('kasusAnggota', ['kasusId' => $kasusId])->with('success', 'Anggota Detach successfully.');
    }

    public function downloadPdf($id)
    {
        $kasus = Kasus::with([
            'pelakus',
            'saksis',
            'anggotas',
            'pasals',
            'intogerasi',
            'kesaksian'
        ])->findOrFail($id);

        // dd($kasus);

        $pdf = Pdf::loadView('kasus.pdf', compact('kasus'))
                  ->setPaper('a4', 'portrait');

        return $pdf->download('laporan-kasus-' . $kasus->nama_kasus . '.pdf');
    }

}
