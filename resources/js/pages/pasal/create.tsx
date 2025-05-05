import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    bab: z.string().min(1, 'Pasal Bab is required'),
    nomor_pasal: z.string().min(1, 'Pasal Nomor Pasal is required'),
});

export default function CreatePasal() {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bab: '',
            nomor_pasal: '',
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.post('/pasal', data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Pasal', href: '/pasal' },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create pasal" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Create pasal</h1>
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
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit">Save</Button>
                                <Link href="/role">
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
