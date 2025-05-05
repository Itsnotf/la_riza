import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { Pasal, PasalTerlanggar } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { log } from 'console';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    kasusId: number;
    pelakuId: number;
    pasals: Pasal[];
    pasalTerlanggars: PasalTerlanggar[];
    currentStatus: 'proses' | 'ditahan' | 'tidak_ditahan';
}

const formSchema = z.object({
    pasal_ids: z.array(z.number()).min(1, 'Pilih minimal satu pasal'),
});

const statusSchema = z.object({
    status: z.enum(['ditahan', 'tidak_ditahan']),
});

export default function PasalTerlanggarForm({ kasusId, pelakuId, pasals, pasalTerlanggars, currentStatus }: Props) {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pasal_ids: pasalTerlanggars.map((pt) => pt.pivot.pasal_id),
        },
    });


    const { handleSubmit, watch, setValue } = methods;
    const selectedPasalIds = watch('pasal_ids');

    const togglePasal = (id: number) => {
        const updated = selectedPasalIds.includes(id) ? selectedPasalIds.filter((pid) => pid !== id) : [...selectedPasalIds, id];

        setValue('pasal_ids', updated, { shouldValidate: true });
    };

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.put(`/kasus/${kasusId}/pelaku/${pelakuId}/pasal/update`, {
            pasal_id: data.pasal_ids,
        });
    };

    const onSubmitStatus = (data: z.infer<typeof statusSchema>) => {
        router.put(`/kasus/${kasusId}/pelaku/${pelakuId}/status`, data);
    };

    const statusMethods = useForm({
        resolver: zodResolver(statusSchema),
        defaultValues: {
            status: currentStatus === 'proses' ? 'ditahan' : currentStatus,
        },
    });

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Pelaku', href: `/kasusPelaku/${kasusId}` },
                { title: 'Pasal Terlanggar', href: '#' },
            ]}
        >
            <Head title="Pasal Terlanggar" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <div>
                    <h1 className="text-xl font-semibold">Pasal Terlanggar</h1>
                    <p className='text-sm'>Pilih Pasal yang Dilanggar</p>
                </div>
                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="pasal_ids"
                                render={() => (
                                    <FormItem>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {pasals.map((pasal) => (
                                                <FormControl key={pasal.id}>
                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id={`pasal-${pasal.id}`}
                                                            checked={selectedPasalIds.includes(pasal.id)}
                                                            onCheckedChange={() => togglePasal(pasal.id)}
                                                        />
                                                        <label
                                                            htmlFor={`pasal-${pasal.id}`}
                                                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            <div className="flex flex-row space-x-2">
                                                                <span className="font-semibold">Pasal {pasal.nomor_pasal}</span>
                                                                <span className="text-muted-foreground">Bab {pasal.bab}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </FormControl>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit" className="w-fit">
                                    Simpan Perubahan
                                </Button>
                                <Link href={`/kasusPelaku/${kasusId}`}>
                                    <Button type="button" variant="outline">
                                        Kembali
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </FormProvider>
            </div>
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h2 className="mb-4 font-medium">Status Penahanan</h2>
                <FormProvider {...statusMethods}>
                    <Form {...statusMethods}>
                        <form onSubmit={statusMethods.handleSubmit(onSubmitStatus)} className="space-y-4">
                            <FormField
                                control={statusMethods.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                                <FormItem className="flex items-center space-y-0 space-x-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="ditahan" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Ditahan</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-y-0 space-x-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="tidak_ditahan" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Tidak Ditahan</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit" size="sm">
                                    Update Status
                                </Button>
                            </div>
                        </form>
                    </Form>
                </FormProvider>
            </div>
        </AppLayout>
    );
}
