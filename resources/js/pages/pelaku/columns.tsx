'use client';

import { Button } from '@/components/ui/button';
import { Pelaku } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';


export const PelakuColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Pelaku>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'tempat_lahir',
        header: 'Tempat Lahir',
    },
    {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
    },
    {
        accessorKey: 'agama',
        header: 'Agama',
    },
    {
        accessorKey: 'pekerjaan',
        header: 'Pekerjaan',
    },
    {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const pelaku = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/pelaku/${pelaku.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(pelaku.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
