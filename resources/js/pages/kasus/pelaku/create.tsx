import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { Pelaku } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils'
import { toast } from 'sonner';

interface Props {
    pelakus: Pelaku[];
    kasusId: string | number;
    existingPelakus: Pelaku[];
}

const formSchema = z.object({
    pelaku_id: z.array(z.number()).min(1, 'Minimal pilih 1 pelaku'),
});

export default function CreateKasusPelaku({ pelakus, kasusId, existingPelakus = [] }: Props) {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pelaku_id: [],
        },
    });

    const { handleSubmit, watch, setValue } = methods;
    const selectedPelakuIds = watch('pelaku_id') || [];

    const handleRemovePelaku = (id: number) => {
        setValue('pelaku_id', selectedPelakuIds.filter(pelakuId => pelakuId !== id), {
            shouldValidate: true
        });
    };

    const availablePelakus = pelakus.filter(pelaku =>
        !existingPelakus.some(ep => ep.id === pelaku.id) &&
        !selectedPelakuIds.includes(pelaku.id)
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const payload = {
            pelaku_id: data.pelaku_id.map(id => Number(id))
        };

        router.post(`/kasusPelaku/${kasusId}/attach`, payload, {
            onSuccess: () => {
                toast.success('Pelaku berhasil ditambahkan');
            },
            onError: (errors) => {
                console.error('Attach error:', errors);
                toast.error('Gagal menambahkan pelaku');
            }
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Kasus', href: '/kasus' },
                { title: 'Pelaku', href: `kasusPelaku/${kasusId}` },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Kasus" />
            <div className="m-4 flex max-h-fit max-w-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <h1 className="text-xl font-semibold">Tambah Pelaku</h1>

                {existingPelakus.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Pelaku yang sudah terdaftar:</p>
                        <div className="flex flex-wrap gap-2">
                            {existingPelakus.map((pelaku) => (
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
                                name="pelaku_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tambah Pelaku Baru</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between"
                                                        disabled={availablePelakus.length === 0}
                                                    >
                                                        {availablePelakus.length === 0
                                                            ? 'Semua pelaku sudah terdaftar atau dipilih'
                                                            : 'Pilih pelaku...'}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari pelaku..." />
                                                    <CommandList>
                                                        <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                                        <CommandGroup>
                                                            {availablePelakus.map((pelaku) => (
                                                                <CommandItem
                                                                    key={pelaku.id}
                                                                    value={pelaku.id.toString()}
                                                                    onSelect={() => {
                                                                        const newValue = [...selectedPelakuIds, pelaku.id];
                                                                        field.onChange(newValue);
                                                                    }}
                                                                >
                                                                    <Check className={cn('mr-2 h-4 w-4 opacity-0')} />
                                                                    {pelaku.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        {selectedPelakuIds.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-medium">Pelaku yang akan ditambahkan:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPelakuIds.map((id: number) => {
                                                    const pelaku = pelakus.find(p => p.id === id);
                                                    if (!pelaku) return null;

                                                    return (
                                                        <div
                                                            key={id}
                                                            className="relative"
                                                            onClick={() => handleRemovePelaku(id)}
                                                        >
                                                            <Badge
                                                                variant="outline"
                                                                className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-red-100 hover:text-red-600"
                                                            >
                                                                {pelaku.name}
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
                                <Button type="submit" disabled={selectedPelakuIds.length === 0}>
                                    Simpan
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
        </AppLayout>
    );
}
