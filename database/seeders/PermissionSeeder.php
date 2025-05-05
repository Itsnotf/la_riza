<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-user',
            'edit-user',
            'delete-user',
            'show-user',
            'create-role',
            'edit-role',
            'delete-role',
            'show-role',
            'create-permission',
            'edit-permission',
            'delete-permission',
            'show-permission',
            'create-kasus',
            'edit-kasus',
            'delete-kasus',
            'show-kasus',
            'create-pelaku',
            'edit-pelaku',
            'delete-pelaku',
            'show-pelaku',
            'create-kasus-pelaku',
            'delete-kasus-pelaku',
            'show-kasus-pelaku',
            'create-kasus-pelaku-interogasi',
            'create-kasus-pelaku-pasal',
            'create-pasal',
            'edit-pasal',
            'delete-pasal',
            'show-pasal',
            'create-saksi',
            'edit-saksi',
            'delete-saksi',
            'show-saksi',
            'create-anggota',
            'edit-anggota',
            'delete-anggota',
            'show-anggota',
            'create-kasus-saksi',
            'delete-kasus-saksi',
            'show-kasus-saksi',
            'create-kasus-saksi-kesaksian',
            'create-kasus-anggota',
            'delete-kasus-anggota',
            'show-kasus-anggota',
            'download-kasus-laporan',


        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
