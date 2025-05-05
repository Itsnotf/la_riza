'use client';

import { Button } from '@/components/ui/button';
import { Pelaku } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { SearchCheck, Trash } from 'lucide-react';

export const KasusSaksiColumns = (
    kasusId: string | number,
    canKesaksian: boolean,
    canDelete: boolean,
    onDelete: (saksiId: number) => void,
): ColumnDef<Pelaku>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const saksi = row.original;
            return (
                <div className="flex space-x-2">
                    {canKesaksian && (
                        <Link href={`/kasus/${kasusId}/saksi/${saksi.id}/kesaksian`}>
                            <Button variant="outline" size="sm">
                                <SearchCheck className="h-4 w-4" />
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
