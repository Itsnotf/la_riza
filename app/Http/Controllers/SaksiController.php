<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaksiRequest;
use App\Http\Requests\UpdateSaksiRequest;
use App\Models\Saksi;
use App\Services\SaksiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaksiController extends Controller
{

    protected $SaksiService;

    public function __construct(SaksiService $SaksiService)
    {
        return $this->SaksiService = $SaksiService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $saksis = $this->SaksiService->getAllSaksi();

        return Inertia::render('saksi/index', [
            'saksis' => $saksis,
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
        return Inertia::render('saksi/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaksiRequest $request)
    {
        $this->SaksiService->createSaksi($request->validated());

        return redirect()->route('saksi.index')->with('success', 'Saksi created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Saksi $saksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $saksi = $this->SaksiService->findSaksi($id);

        return Inertia::render('saksi/edit',[
            'saksi' => $saksi
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaksiRequest $request, string $id)
    {
        $this->SaksiService->updateSaksi($id, $request->validated());

        return redirect()->route('saksi.index')->with('success', 'Saksi updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->SaksiService->deleteSaksi($id);
    }
}
