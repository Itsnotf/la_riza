import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Kasus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';


interface Props {
    kasus: Kasus;
}

const formSchema = z.object({
    nama_kasus: z.string().min(1, 'Kasus name is required'),
    kronologi: z.string().min(1, 'Kasus Kronologi is required'),
    tanggal : z.string().min(1, 'Kasus Tanggal is required'),
});

export default function EditKasus({ kasus }: Props) {
    const methods = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                nama_kasus: kasus.nama_kasus,
                kronologi: kasus.kronologi,
                tanggal: kasus.tanggal,
            },
        });


    const { handleSubmit } = methods;


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/kasus/${kasus.id}`, data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Kasus" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Edit Kasus</h1>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                                name="nama_kasus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kasus</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="kronologi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kronologi</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="tanggal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kasus</FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit" className="w-fit">
                                    Update
                                </Button>
                                <Link href='/kasus'>
                                    <Button type="button">
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </FormProvider>
            </div>
        </AppLayout>
    );
}
