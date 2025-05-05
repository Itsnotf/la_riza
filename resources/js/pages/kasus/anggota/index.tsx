import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Anggota, KasusPelaku, Pelaku, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { KasusAnggotaColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kasus',
        href: '/kasus',
    },
    {
        title: 'Anggota',
        href: '/#',
    },
];

interface Props {
    anggotas: Anggota[];
    kasusId: string | number;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function KasusAnggotaIndex({ anggotas, flash, kasusId }: Props) {
    const [open, setOpen] = useState(false);
    const [anggotaToDelete, setAnggotaToDelete] = useState<number | null>(null);



    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canDelete = can('delete-kasus-anggota', auth);
    const canCreate = can('create-kasus-anggota', auth);

    const handleDelete = ( anggotaId: number) => {
        setAnggotaToDelete(anggotaId);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (anggotaToDelete) {
            router.post(`/kasusAnggota/${kasusId}/detach/${anggotaToDelete}`, {}, {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Anggota berhasil dipisahkan dari kasus');
                },
                onError: () => {
                    toast.error('Gagal memisahkan anggota dari kasus');
                }
            });
        }
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kasus Anggota" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    id={kasusId}
                    columns={KasusAnggotaColumns( canDelete, handleDelete)}
                    data={anggotas || []}
                    page="kasusAnggota"
                    canCreate={canCreate}
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Pisahkan Anggota dari Kasus</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Anda yakin ingin memisahkan anggota ini dari kasus?</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Konfirmasi
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
