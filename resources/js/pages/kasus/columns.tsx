'use client';

import { Button } from '@/components/ui/button';
import { Kasus } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Edit, Eye, Trash, UserCheck, UserX } from 'lucide-react';

export const KasusColumns = (
    canDownload: boolean,
    canShowAnggota: boolean,
    canShowSaksi: boolean,
    canShowPelaku: boolean,
    canEdit: boolean,
    canDelete: boolean,
    onDelete: (id: number) => void,
): ColumnDef<Kasus>[] => [
    {
        accessorKey: 'nama_kasus',
        header: 'Name',
    },
    {
        accessorKey: 'kronologi',
        header: 'Kronologi',
    },
    {
        accessorKey: 'tanggal',
        header: 'Tanggal',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const kasus = row.original;

            return (
                <div className="flex space-x-2">
                    {canShowPelaku && (
                        <Link href={`/kasusPelaku/${kasus.id}`}>
                            <Button variant="outline" size="sm">
                                <UserX className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canShowAnggota && (
                        <Link href={`/kasusAnggota/${kasus.id}`}>
                            <Button variant="outline" size="sm">
                                <UserCheck className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canShowSaksi && (
                        <Link href={`/kasusSaksi/${kasus.id}`}>
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDownload && (
                        <a href={`/kasus/${kasus.id}/download`} download target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </a>
                    )}
                    {canEdit && (
                        <Link href={`/kasus/${kasus.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {canDelete && (
                        <Button variant="outline" size="sm" onClick={() => onDelete(kasus.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            );
        },
    },
];
