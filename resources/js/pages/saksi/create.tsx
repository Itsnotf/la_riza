import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(1, 'saksi name is required'),
    tempat_lahir: z.string().min(1, 'Tempat Tanggal Lahir is required'),
    tanggal_lahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Format tanggal harus YYYY-MM-DD',
    }),
    agama: z.string().min(1, 'Harus pilih agama'),
    pekerjaan: z.string().min(1, 'Pekerjaan is required'),
    jenis_kelamin: z.enum(['L', 'P'], {
        required_error: 'Harus pilih jenis kelamin',
    }),
    alamat: z.string().min(1, 'Alamat is required'),
    status: z.enum(['lajang', 'menikah'], {
        required_error: 'Harus pilih status',
    }),
});

export default function CreatePelaku() {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            agama: '',
            pekerjaan: '',
            jenis_kelamin: undefined,
            alamat: '',
            status: undefined,
        },
    });

    const AGAMA_OPTIONS = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya'];

    const JENIS_KELAMIN_OPTIONS = [
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' },
    ];

    const STATUS_OPTIONS = [
        { value: 'lajang', label: 'Lajang' },
        { value: 'menikah', label: 'Sudah Menikah' },
    ];

    const { handleSubmit } = methods;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.post('/saksi', data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Saksi', href: '/saksi' },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Saksi" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Create Saksi</h1>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="tempat_lahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tempat Lahir</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="tanggal_lahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <DatePicker value={field.value} onChange={field.onChange} label="Tanggal Lahir" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="agama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agama</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih agama" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {AGAMA_OPTIONS.map((agama) => (
                                                    <SelectItem key={agama} value={agama}>
                                                        {agama}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="pekerjaan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pekerjaan</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="jenis_kelamin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {JENIS_KELAMIN_OPTIONS.map((jk) => (
                                                    <SelectItem key={jk.value} value={jk.value}>
                                                        {jk.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {STATUS_OPTIONS.map((status) => (
                                                    <SelectItem key={status.value} value={status.value}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit">Save</Button>
                                <Link href="/saksi">
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
