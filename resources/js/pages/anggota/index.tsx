import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Anggota, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AnggotaColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/anggota',
    },
];

interface Props {
    anggotas: Anggota[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function AnggotaIndex({ anggotas, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [anggotaToDelete, setAnggotaToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-anggota', auth);
    const canDelete = can('delete-anggota', auth);
    const canCreate = can('create-anggota', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setAnggotaToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (anggotaToDelete) {
            destroy(`/anggota/${anggotaToDelete}`, {
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
            <Head title="Anggota" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={AnggotaColumns(canEdit, canDelete, handleDelete)} data={anggotas} page="anggota" canCreate={canCreate} />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Anggota</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this anggota?</p>
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
