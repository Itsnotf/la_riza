import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Pelaku, Saksi } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils'
import { toast } from 'sonner';

interface Props {
    saksis: Saksi[];
    kasusId: string | number;
    existingSaksis: Saksi[];
}

const formSchema = z.object({
    saksi_id: z.array(z.number()).min(1, 'Minimal pilih 1 pelaku'),
});

export default function CreateKasusSaksi({ saksis, kasusId, existingSaksis = [] }: Props) {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            saksi_id: [],
        },
    });

    const { handleSubmit, watch, setValue } = methods;
    const selectedSaksiIds = watch('saksi_id') || [];

    const handleRemoveSaksi = (id: number) => {
        setValue('saksi_id', selectedSaksiIds.filter(pelakuId => pelakuId !== id), {
            shouldValidate: true
        });
    };

    const availableSaksis = saksis.filter(saksi =>
        !existingSaksis.some(ep => ep.id === saksi.id) &&
        !selectedSaksiIds.includes(saksi.id)
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const payload = {
            saksi_id: data.saksi_id.map(id => Number(id))
        };

        router.post(`/kasusSaksi/${kasusId}/attach`, payload, {
            onSuccess: () => {
                toast.success('Saksi berhasil ditambahkan');
            },
            onError: (errors) => {
                console.error('Attach error:', errors);
                toast.error('Gagal menambahkan Saksi');
            }
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Saksi', href: `kasusSaksi/${kasusId}` },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Kasus Saksi" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Tambah Saksi</h1>

                {existingSaksis.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Saksi yang sudah terdaftar:</p>
                        <div className="flex flex-wrap gap-2">
                            {existingSaksis.map((pelaku) => (
                                <Badge key={pelaku.id} variant="secondary">
                                    {pelaku.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="saksi_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tambah Saksi Baru</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between"
                                                        disabled={availableSaksis.length === 0}
                                                    >
                                                        {availableSaksis.length === 0
                                                            ? 'Semua Saksi sudah terdaftar atau dipilih'
                                                            : 'Pilih Saksi...'}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari saksi..." />
                                                    <CommandList>
                                                        <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                                        <CommandGroup>
                                                            {availableSaksis.map((saksi) => (
                                                                <CommandItem
                                                                    key={saksi.id}
                                                                    value={saksi.id.toString()}
                                                                    onSelect={() => {
                                                                        const newValue = [...selectedSaksiIds, saksi.id];
                                                                        field.onChange(newValue);
                                                                    }}
                                                                >
                                                                    <Check className={cn('mr-2 h-4 w-4 opacity-0')} />
                                                                    {saksi.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        {selectedSaksiIds.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-medium">Pelaku yang akan ditambahkan:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedSaksiIds.map((id: number) => {
                                                    const saksi = saksis.find(p => p.id === id);
                                                    if (!saksi) return null;

                                                    return (
                                                        <div
                                                            key={id}
                                                            className="relative"
                                                            onClick={() => handleRemoveSaksi(id)}
                                                        >
                                                            <Badge
                                                                variant="outline"
                                                                className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-red-100 hover:text-red-600"
                                                            >
                                                                {saksi.name}
                                                                <X className="h-3 w-3" />
                                                            </Badge>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button type="submit" disabled={selectedSaksiIds.length === 0}>
                                    Simpan
                                </Button>
                                <Link href={`/kasusSaksi/${kasusId}`}>
                                    <Button type="button" variant="outline">
                                        Kembali
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
