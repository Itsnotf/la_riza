import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Kasus, Pelaku, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PelakuColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pelaku',
        href: '/pelaku',
    },
];

interface Props {
    pelakus: Pelaku[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function PelakuIndex({ pelakus, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [pelakuToDelete, setPelakuToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-pelaku', auth);
    const canDelete = can('delete-pelaku', auth);
    const canCreate = can('create-pelaku', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setPelakuToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (pelakuToDelete) {
            destroy(`/pelaku/${pelakuToDelete}`, {
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
                <DataTable columns={PelakuColumns(canEdit, canDelete, handleDelete)} data={pelakus} page="pelaku" canCreate={canCreate} />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Pelaku</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this pelaku?</p>
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
