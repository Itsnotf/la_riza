import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Kesaksian } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    kesaksian: Kesaksian | null;
    kasusId : number | string,
    saksiId : number | string
}
const formSchema = z.object({
    deskripsi: z.string().min(1, 'Deksripsi  is required'),
    ikatan: z.string().min(1, 'Ikatan is required'),
    bukti: z.instanceof(FileList)
        .optional()
        .refine((files) => !files || files.length === 0 || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0]?.type),
            'Hanya file PDF atau Word yang diperbolehkan'),
});


export default function CreateSaksiKesaksian({ kesaksian, kasusId, saksiId }: Props) {
    const initialValues = kesaksian ? {
        deskripsi: kesaksian.deskripsi,
        bukti: undefined,
        ikatan: kesaksian.ikatan
    } : {
        deskripsi: '',
        ikatan: '',
        bukti: undefined
    };

    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('deskripsi', data.deskripsi);
        formData.append('ikatan', data.ikatan);
        if (data.bukti && data.bukti.length > 0) {
            formData.append('bukti', data.bukti[0]);
        }
        router.post(`/kasus/${kasusId}/saksi/${saksiId}/create/kesaksian`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Saksi', href: `/kasusSaksi/${kasusId}` },
                { title: `Kesaksian`, href: '#' },
            ]}
        >
            <Head title="Create Kesaksian" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Create Kesaksian</h1>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                            <FormField
                                name="deskripsi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi Kesaksian</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="min-h-[120px]" placeholder="Masukkan deskripsi kesaksian..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="ikatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ikatan Saksi Dengan Pelaku</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="bukti"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bukti (PDF/Word)</FormLabel>
                                        {kesaksian?.bukti ? (
                                            <div className="space-y-2">
                                                <p className="text-muted-foreground text-sm">Bukti yang sudah diupload:</p>
                                                <a
                                                    href={`/storage/${kesaksian.bukti}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat Bukti
                                                </a>
                                                <p className="text-muted-foreground text-sm">Upload file baru untuk mengganti:</p>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => {
                                                            field.onChange(e.target.files);
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                        ) : (
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => {
                                                        field.onChange(e.target.files);
                                                    }}
                                                />
                                            </FormControl>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit">Save</Button>
                                <Link href={`/kasusSaksi/${kasusId}`}>
                                    <Button type="button" variant="outline">
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
