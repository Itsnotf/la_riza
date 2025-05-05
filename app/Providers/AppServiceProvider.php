<?php

namespace App\Providers;

use App\Repositories\KasusRepository as RepositoriesKasusRepository;
use App\Repositories\KasusRepositoryInterface as RepositoriesKasusRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RepositoriesKasusRepositoryInterface::class, RepositoriesKasusRepository::class);
        $this->app->bind(\App\Services\KasusService::class, \App\Services\KasusService::class);
        $this->app->bind(\App\Repositories\PelakuRepositoryInterface::class, \App\Repositories\PelakuRepository::class);
        $this->app->bind(\App\Services\PelakuService::class, \App\Services\PelakuService::class);
        $this->app->bind(\App\Repositories\PasalRepositoryInterface::class, \App\Repositories\PasalRepository::class);
        $this->app->bind(\App\Services\PasalService::class, \App\Services\PasalService::class);
        $this->app->bind(\App\Repositories\SaksiRepositoryInterface::class, \App\Repositories\SaksiRepository::class);
        $this->app->bind(\App\Services\SaksiService::class, \App\Services\SaksiService::class);
        $this->app->bind(\App\Repositories\AnggotaRepositoryInterface::class, \App\Repositories\AnggotaRepository::class);
        $this->app->bind(\App\Services\AnggotaService::class, \App\Services\AnggotaService::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return [
                    'user' => $user,
                    'roles' => $user?->getRoleNames()->toArray(),
                ];
            },
        ]);
    }
}
