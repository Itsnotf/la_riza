<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePelakuRequest;
use App\Http\Requests\UpdatePelakuRequest;
use App\Models\Pelaku;
use App\Services\PelakuService;
use Illuminate\Http\Request;

class PelakuController extends Controller
{

    protected $PelakuService;

    public function __construct(PelakuService $PelakuService)
    {
        $this->PelakuService = $PelakuService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pelakus = $this->PelakuService->getAllPelaku();
        return inertia('pelaku/index', [
            'pelakus' => $pelakus,
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
        return inertia('pelaku/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePelakuRequest $request)
    {
        $this->PelakuService->createPelaku($request->validated());

        return redirect()->route('pelaku.index')->with('success', 'Pelaku created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelaku $pelaku)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pelaku = $this->PelakuService->findPelaku($id);

        return inertia('pelaku/edit', [
            'pelaku' => $pelaku
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePelakuRequest $request, string $id)
    {
        $this->PelakuService->updatePelaku($id, $request->validated());

        return redirect()->route('pelaku.index')->with('success', 'Pelaku updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->PelakuService->deletePelaku($id);

        return redirect()->route('pelaku.index')->with('success', 'Pelaku deleted successfully.');
    }

}
