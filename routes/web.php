<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\KasusController;
use App\Http\Controllers\PasalController;
use App\Http\Controllers\PelakuController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaksiController;
use App\Http\Controllers\UserController;
use App\Models\Kasus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $pelakuStatus = DB::table('kasus_pelaku')
                        ->select('status', DB::raw('count(*) as total'))
                        ->groupBy('status')
                        ->pluck('total', 'status')
                        ->toArray();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_kasus' => Kasus::count(),
                'pelaku_ditahan' => $pelakuStatus['ditahan'] ?? 0,
                'pelaku_tidak_ditahan' => $pelakuStatus['tidak_ditahan'] ?? 0,
            ]
        ]);

        dd($pelakuStatus);
    })->name('dashboard');

    route::resource('permission', PermissionController::class);
    route::resource('role', RoleController::class);
    route::resource('user', UserController::class);
    route::resource('kasus', KasusController::class);
    route::resource('pelaku', PelakuController::class);
    route::resource('pasal', PasalController::class);
    route::resource('saksi', SaksiController::class);
    route::resource('anggota', AnggotaController::class);
    route::get('kasusPelaku/{kasusId}', [KasusController::class, 'AllKasusPelaku'])->name('kasusPelaku');
    route::get('kasusPelaku/{kasusId}/create', [KasusController::class, 'createPelaku']);
    route::post('kasusPelaku/{kasusId}/attach', [KasusController::class, 'attachPelaku']);
    route::post('kasusPelaku/{kasusId}/detach/{pelakuId}', [KasusController::class, 'detachPelaku']);
    route::get('kasus/{kasusId}/pelaku/{pelakuId}/interogasi', [KasusController::class, 'findInterogasi']);
    route::post('kasus/{kasusId}/pelaku/{pelakuId}/create', [KasusController::class, 'createInterogasi']);
    route::get('kasus/{kasusId}/pelaku/{pelakuId}/pasal', [KasusController::class, 'pasalTerlanggar']);
    route::put('kasus/{kasusId}/pelaku/{pelakuId}/pasal/update', [KasusController::class, 'updatePasalTerlanggar']);
    route::put('kasus/{kasusId}/pelaku/{pelakuId}/status', [KasusController::class, 'updateStatus']);

    route::get('kasusSaksi/{kasusId}', [KasusController::class, 'AllKasusSaksi'])->name('kasusSaksi');;
    route::get('kasusSaksi/{kasusId}/create', [KasusController::class, 'createSaksi']);
    route::post('kasusSaksi/{kasusId}/attach', [KasusController::class, 'attachSaksi']);
    route::post('kasusSaksi/{kasusId}/detach/{saksiId}', [KasusController::class, 'detachSaksi']);
    route::get('kasus/{kasusId}/saksi/{saksiId}/kesaksian', [KasusController::class, 'findKesaksian']);
    route::post('kasus/{kasusId}/saksi/{saksiId}/create/kesaksian', [KasusController::class, 'createKesaksian']);

    route::get('kasusAnggota/{kasusId}', [KasusController::class, 'AllKasusAnggota'])->name('kasusAnggota');
    route::get('kasusAnggota/{kasusId}/create', [KasusController::class, 'createAnggota']);
    route::post('kasusAnggota/{kasusId}/attach', [KasusController::class, 'attachAnggota']);
    route::post('kasusAnggota/{kasusId}/detach/{anggotaId}', [KasusController::class, 'detachAnggota']);

    route::get('kasus/{kasusId}/download', [KasusController::class, 'downloadPdf']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
