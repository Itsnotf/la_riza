import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Kasus, Pelaku, Saksi, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SaksiColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Saksi',
        href: '/saksi',
    },
];

interface Props {
    saksis: Saksi[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function PelakuIndex({ saksis, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [saksiToDelete, setSaksiToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-saksi', auth);
    const canDelete = can('delete-saksi', auth);
    const canCreate = can('create-saksi', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setSaksiToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (saksiToDelete) {
            destroy(`/saksi/${saksiToDelete}`, {
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
            <Head title="Pelaku" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={SaksiColumns(canEdit, canDelete, handleDelete)} data={saksis} page="saksi" canCreate={canCreate} />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Saksi</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this saksi?</p>
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
