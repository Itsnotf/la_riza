import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Pasal } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    pasal: Pasal;
}

const formSchema = z.object({
    bab: z.string().min(1, 'Pasal Bab is required'),
    nomor_pasal: z.union([z.string().min(1), z.number().min(1)]),
});

export default function EditRole({ pasal }: Props) {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bab: pasal.bab,
            nomor_pasal: pasal.id,
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/pasal/${pasal.id}`, data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Pasal', href: '/pasal' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Pasal" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Edit Pasal</h1>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="bab"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bab</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="nomor_pasal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomor Pasal</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit" className="w-fit">
                                    Update
                                </Button>
                                <Link href="/pasal">
                                    <Button type="button">Back</Button>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </FormProvider>
            </div>
        </AppLayout>
    );
}
