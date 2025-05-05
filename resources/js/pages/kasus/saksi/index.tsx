import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { KasusPelaku, Pelaku, Saksi, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { KasusSaksiColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kasus',
        href: '/kasus',
    },
    {
        title: 'Saksi',
        href: '/#',
    },
];

interface Props {
    saksis: Saksi[];
    kasusId: string | number;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function KasusPelakuIndex({ saksis, flash, kasusId }: Props) {
    const [open, setOpen] = useState(false);
    const [saksiToDelete, setSaksiToDelete] = useState<number | null>(null);



    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canDelete = can('delete-kasus-saksi', auth);
    const canCreate = can('create-kasus-saksi', auth);
    const canKesaksian = can('create-kasus-saksi-kesaksian', auth);

    const handleDelete = ( saksiId: number) => {
        setSaksiToDelete(saksiId);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (saksiToDelete) {
            router.post(`/kasusSaksi/${kasusId}/detach/${saksiToDelete}`, {}, {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Saksi berhasil dipisahkan dari kasus');
                },
                onError: () => {
                    toast.error('Gagal memisahkan Saksi dari kasus');
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
            <Head title="Kasus Saksi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    id={kasusId}
                    columns={KasusSaksiColumns( kasusId ,canKesaksian, canDelete, handleDelete)}
                    data={saksis || []}
                    page="kasusSaksi"
                    canCreate={canCreate}
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Pisahkan Pelaku dari Kasus</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Anda yakin ingin memisahkan pelaku ini dari kasus?</p>
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
