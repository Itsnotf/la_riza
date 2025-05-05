'use client';

import { Button } from '@/components/ui/button';
import { Anggota, Pelaku } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';

export const AnggotaColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Anggota>[] => [
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
                    {canEdit && (
                        <Link href={`/anggota/${anggota.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
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
