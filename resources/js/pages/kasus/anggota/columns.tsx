'use client';

import { Button } from '@/components/ui/button';
import { Anggota, Pelaku } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

export const KasusAnggotaColumns = (canDelete: boolean,onDelete: (pelakuId: number) => void): ColumnDef<Anggota>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'pangkat',
        header: 'Pangkat',
    },
    {
        accessorKey: 'jabatan',
        header: 'Jabatan',
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const anggota = row.original;
            return (
                <div className="flex space-x-2">
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(anggota.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
