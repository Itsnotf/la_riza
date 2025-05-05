import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { interogasi } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    interogasi: interogasi | null;
    kasusId : number | string,
    pelakuId : number | string
}
const formSchema = z.object({
    deskripsi: z.string().min(1, 'Kasus name is required'),
    bukti: z.instanceof(FileList)
        .optional()
        .refine((files) => !files || files.length === 0 || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0]?.type),
            'Hanya file PDF atau Word yang diperbolehkan'),
});


export default function CreatePelakuInterogasi({ interogasi, kasusId, pelakuId }: Props) {
    const initialValues = interogasi ? {
        deskripsi: interogasi.deskripsi,
        bukti: undefined
    } : {
        deskripsi: '',
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
        if (data.bukti && data.bukti.length > 0) {
            formData.append('bukti', data.bukti[0]);
        }
        router.post(`/kasus/${kasusId}/pelaku/${pelakuId}/create`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Pelaku', href: `/kasusPelaku/${kasusId}` },
                { title: `Interogasi`, href: '#' },
            ]}
        >
            <Head title="Create Interogasi" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Create Interogasi</h1>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                            <FormField
                                name="deskripsi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi Interogasi</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="min-h-[120px]" placeholder="Masukkan deskripsi interogasi..." />
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
                                        {interogasi?.bukti ? (
                                            <div className="space-y-2">
                                                <p className="text-muted-foreground text-sm">Bukti yang sudah diupload:</p>
                                                <a
                                                    href={`/storage/${interogasi.bukti}`}
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
                                <Link href={`/kasusPelaku/${kasusId}`}>
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
