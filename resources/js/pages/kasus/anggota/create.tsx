import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Anggota, Pelaku } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils'
import { toast } from 'sonner';

interface Props {
    anggotas: Anggota[];
    kasusId: string | number;
    existingAnggotas: Anggota[];
}

const formSchema = z.object({
    anggota_id: z.array(z.number()).min(1, 'Minimal pilih 1 pelaku'),
});

export default function CreateKasusPelaku({ anggotas, kasusId, existingAnggotas = [] }: Props) {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            anggota_id: [],
        },
    });

    const { handleSubmit, watch, setValue } = methods;
    const selectedAnggotaIds = watch('anggota_id') || [];

    const handleRemoveAnggota = (id: number) => {
        setValue('anggota_id', selectedAnggotaIds.filter(anggotaId => anggotaId !== id), {
            shouldValidate: true
        });
    };

    const availableAnggotas = anggotas.filter(anggota =>
        !existingAnggotas.some(ep => ep.id === anggota.id) &&
        !selectedAnggotaIds.includes(anggota.id)
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const payload = {
            anggota_id: data.anggota_id.map(id => Number(id))
        };

        router.post(`/kasusAnggota/${kasusId}/attach`, payload, {
            onSuccess: () => {
                toast.success('Anggota berhasil ditambahkan');
            },
            onError: (errors) => {
                console.error('Attach error:', errors);
                toast.error('Gagal menambahkan Anggota');
            }
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Anggota', href: `kasusAnggota/${kasusId}` },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Kasus" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Tambah Pelaku</h1>

                {existingAnggotas.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Pelaku yang sudah terdaftar:</p>
                        <div className="flex flex-wrap gap-2">
                            {existingAnggotas.map((anggota) => (
                                <Badge key={anggota.id} variant="secondary">
                                    {anggota.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <FormProvider {...methods}>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="anggota_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tambah Anggota Baru</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between"
                                                        disabled={availableAnggotas.length === 0}
                                                    >
                                                        {availableAnggotas.length === 0
                                                            ? 'Semua Anggota sudah terdaftar atau dipilih'
                                                            : 'Pilih Anggota...'}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari Anggota..." />
                                                    <CommandList>
                                                        <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                                        <CommandGroup>
                                                            {availableAnggotas.map((anggota) => (
                                                                <CommandItem
                                                                    key={anggota.id}
                                                                    value={anggota.id.toString()}
                                                                    onSelect={() => {
                                                                        const newValue = [...selectedAnggotaIds, anggota.id];
                                                                        field.onChange(newValue);
                                                                    }}
                                                                >
                                                                    <Check className={cn('mr-2 h-4 w-4 opacity-0')} />
                                                                    {anggota.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        {selectedAnggotaIds.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-medium">Anggota yang akan ditambahkan:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedAnggotaIds.map((id: number) => {
                                                    const anggota = anggotas.find(p => p.id === id);
                                                    if (!anggota) return null;
                                                    return (
                                                        <div
                                                            key={id}
                                                            className="relative"
                                                            onClick={() => handleRemoveAnggota(id)}
                                                        >
                                                            <Badge
                                                                variant="outline"
                                                                className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-red-100 hover:text-red-600"
                                                            >
                                                                {anggota.name}
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
                                <Button type="submit" disabled={selectedAnggotaIds.length === 0}>
                                    Simpan
                                </Button>
                                <Link href={`/kasusAnggota/${kasusId}`}>
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
