'use client';

import { Button } from '@/components/ui/button';
import { Pasal } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash } from 'lucide-react';


export const RoleColumns = (canEdit: boolean, canDelete: boolean, onDelete: (id: number) => void): ColumnDef<Pasal>[] => [
    {
        accessorKey: 'bab',
        header: 'Bab',
    },
    {
        accessorKey: 'nomor_pasal',
        header: 'Nomor Pasal',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const pasal = row.original;

            return (
                <div className="flex space-x-2">
                    {canEdit && (
                        <Link href={`/pasal/${pasal.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(pasal.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
