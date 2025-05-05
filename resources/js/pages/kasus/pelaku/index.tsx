import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { KasusPelaku, Pelaku, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { KasusPelakuColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kasus',
        href: '/kasus',
    },
    {
        title: 'Pelaku',
        href: '/#',
    },
];

interface Props {
    pelaku: Pelaku[];
    kasusId: string | number;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function KasusPelakuIndex({ pelaku, flash, kasusId }: Props) {
    const [open, setOpen] = useState(false);
    const [pelakuToDelete, setPelakuToDelete] = useState<number | null>(null);



    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canDelete = can('delete-kasus-pelaku', auth);
    const canCreate = can('create-kasus-pelaku', auth);
    const canInterogasi = can('create-kasus-pelaku-interogasi', auth);
    const canPasal = can('create-kasus-pelaku-pasal', auth);

    const handleDelete = ( pelakuId: number) => {
        setPelakuToDelete(pelakuId);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (pelakuToDelete) {
            router.post(`/kasusPelaku/${kasusId}/detach/${pelakuToDelete}`, {}, {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Pelaku berhasil dipisahkan dari kasus');
                },
                onError: () => {
                    toast.error('Gagal memisahkan pelaku dari kasus');
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
            <Head title="Kasus Pelaku" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    id={kasusId}
                    columns={KasusPelakuColumns(canPasal, kasusId ,canInterogasi, canDelete, handleDelete)}
                    data={pelaku || []}
                    page="kasusPelaku"
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
