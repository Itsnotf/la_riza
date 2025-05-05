'use client';

import { Button } from '@/components/ui/button';
import { Pelaku, Saksi } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';


export const SaksiColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Saksi>[] => [
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
            const saksi = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/saksi/${saksi.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(saksi.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
