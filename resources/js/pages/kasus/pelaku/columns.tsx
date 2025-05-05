'use client';

import { Button } from '@/components/ui/button';
import { Pelaku } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { BookText, SearchCheck, Trash } from 'lucide-react';

export const KasusPelakuColumns = (
    canPasal: boolean,
    kasusId: string | number,
    canInterogasi: boolean,
    canDelete: boolean,
    onDelete: (pelakuId: number) => void,
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
        accessorKey: 'pivot.status',
        header: 'Status',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const pelaku = row.original;

            return (
                <div className="flex space-x-2">
                    {canInterogasi && (
                        <Link href={`/kasus/${kasusId}/pelaku/${pelaku.id}/interogasi`}>
                            <Button variant="outline" size="sm">
                                <SearchCheck className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canPasal && (
                        <Link href={`/kasus/${kasusId}/pelaku/${pelaku.id}/pasal`}>
                            <Button variant="outline" size="sm">
                                <BookText className="h-4 w-4" />
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
