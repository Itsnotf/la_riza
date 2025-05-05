<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasalRequest;
use App\Http\Requests\UpdatePasalRequest;
use App\Models\Pasal;
use App\Services\PasalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasalController extends Controller
{
    protected $pasalService;

    public function __construct(PasalService $pasalService)
    {
        $this->pasalService = $pasalService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pasals = $this->pasalService->getAllPasal();

        return inertia('pasal/index', [
            'pasals' => $pasals,
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
        return Inertia::render('pasal/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePasalRequest $request)
    {
        $this->pasalService->createPasal($request->validated());

        return redirect()->route('pasal.index')->with('success', 'Pasal created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasal $pasal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pasal = $this->pasalService->findPasal($id);

        return Inertia::render('pasal/edit', [
            'pasal' => $pasal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePasalRequest $request, string $id)
    {
        $this->pasalService->updatePasal($id, $request->validated());

        return redirect()->route('pasal.index')->with('success', 'Pasal updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->pasalService->deletePasal($id);

        return redirect()->route('pasal.index')->with('success', 'Pasal deleted successfully.');
    }
}
