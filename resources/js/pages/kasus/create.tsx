import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Kasus } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';



const formSchema = z.object({
    nama_kasus: z.string().min(1, 'Kasus name is required'),
    kronologi: z.string().min(1, 'Kasus Kronologi is required'),
    tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Format tanggal harus YYYY-MM-DD',
    }),
});

export default function CreateKasus() {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_kasus: '',
            kronologi: '',
            tanggal: undefined,
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.post('/kasus', data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Kasus" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Create Kasus</h1>
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
                                render={({ field }) => {
                                    const dateValue = field.value ? new Date(field.value) : undefined;

                                    return (
                                        <FormItem>
                                            <FormLabel>Tanggal Kasus</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                                                            {field.value || <span>Pilih tanggal</span>}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={dateValue}
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                const formattedDate = format(date, 'yyyy-MM-dd');
                                                                field.onChange(formattedDate);
                                                            }
                                                        }}
                                                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <div className="flex justify-end space-x-2">
                                <Button type="submit">Save</Button>
                                <Link href="/kasus">
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
