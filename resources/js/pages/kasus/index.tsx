import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Kasus, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { KasusColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kasus',
        href: '/kasus',
    },
];

interface Props {
    kasus: Kasus[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function KasusIndex({ kasus, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [kasusToDelete, setKasusToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-kasus', auth);
    const canDelete = can('delete-kasus', auth);
    const canCreate = can('create-kasus', auth);
    const canShowPelaku = can('show-kasus-pelaku', auth);
    const canShowSaksi = can('show-kasus-saksi', auth);
    const canShowAnggota = can('show-kasus-anggota', auth);
    const canDownload = can('download-kasus-laporan', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setKasusToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (kasusToDelete) {
            destroy(`/kasus/${kasusToDelete}`, {
                onSuccess: () => {
                    setOpen(false);
                },
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
            <Head title="Kasus" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={KasusColumns(canDownload, canShowAnggota, canShowSaksi,canShowPelaku, canEdit, canDelete ,handleDelete)} data={kasus} page="kasus" canCreate={canCreate} />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Kasus</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this kasus?</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="destructive" onClick={confirmDelete}>
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
