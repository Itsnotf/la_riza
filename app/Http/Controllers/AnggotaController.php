<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnggotaRequest;
use App\Http\Requests\UpdateAnggotaRequest;
use App\Models\Anggota;
use App\Services\AnggotaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaController extends Controller
{
    protected $AnggotaService;

    public function  __construct(AnggotaService $AnggotaService)
    {
        $this->AnggotaService = $AnggotaService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anggotas = $this->AnggotaService->getAllAnggota();

        return Inertia::render('anggota/index', [
            'anggotas' => $anggotas,
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
        return Inertia::render('anggota/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnggotaRequest $request)
    {
        $this->AnggotaService->createAnggota($request->validated());

        return redirect()->route('anggota.index')->with('success', 'Anggota updated successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Anggota $anggota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $anggota = $this->AnggotaService->findAnggota($id);

        return Inertia::render('anggota/edit',[
            'anggota' => $anggota
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnggotaRequest $request, string $id)
    {
        $this->AnggotaService->updateAnggota($id, $request->validated());

        return redirect()->route('anggota.index')->with('success', 'Anggota updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->AnggotaService->deleteAnggota($id);
    }
}
