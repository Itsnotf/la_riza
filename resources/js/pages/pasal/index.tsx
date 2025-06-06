import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Pasal, type BreadcrumbItem } from '@/types';
import { can } from '@/utils/permission';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RoleColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pasal',
        href: '/pasal',
    },
];


interface Props {
    pasals: Pasal[];
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function RoleIndex({ pasals, flash }: Props) {
    const [open, setOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

    const page = usePage().props as {
        auth?: {
            permissions: string[];
            roles?: string[];
        };
    };

    const auth = page.auth ?? { permissions: [] };
    const canEdit = can('edit-pasal', auth);
    const canDelete = can('delete-pasal', auth);
    const canCreate = can('create-pasal', auth);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        setRoleToDelete(id);
        setOpen(true);
    };

    const confirmDelete = () => {
        if (roleToDelete) {
            destroy(`/pasal/${roleToDelete}`, {
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
            <Head title="Pasal" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={RoleColumns(canEdit, canDelete, handleDelete)} data={pasals} page="pasal" canCreate={canCreate} />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger />
                    <DialogContent>
                        <DialogHeader>
                            <h3 className="text-lg font-semibold">Delete Pasal</h3>
                        </DialogHeader>
                        <div className="mt-4">
                            <p>Are you sure you want to delete this pasal?</p>
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
