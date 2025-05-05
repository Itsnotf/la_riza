import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  fromYear?: number;
  toYear?: number;
}

export const DatePicker = ({
  value,
  onChange,
  label = 'Tanggal Lahir',
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: DatePickerProps) => {
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const years = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => fromYear + i
  ).reverse();

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handleYearChange = (year: string) => {
    const newDate = internalDate ? new Date(internalDate) : new Date();
    newDate.setFullYear(parseInt(year));

    const daysInMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    ).getDate();

    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }

    setInternalDate(newDate);
    onChange(format(newDate, 'yyyy-MM-dd'));
  };

  const handleMonthChange = (monthIndex: string) => {
    const newDate = internalDate ? new Date(internalDate) : new Date();
    const month = parseInt(monthIndex) - 1;
    newDate.setMonth(month);

    const daysInMonth = new Date(
      newDate.getFullYear(),
      month + 1,
      0
    ).getDate();

    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }

    setInternalDate(newDate);
    onChange(format(newDate, 'yyyy-MM-dd'));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setInternalDate(date);
    onChange(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="grid grid-cols-3 gap-2">
        {/* Year Select */}
        <Select
          value={internalDate ? String(internalDate.getFullYear()) : ''}
          onValueChange={handleYearChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent className="h-60">
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Month Select */}
        <Select
          value={internalDate ? String(internalDate.getMonth() + 1) : ''}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Bulan" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {months.map((month, index) => (
              <SelectItem key={month} value={String(index + 1)}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Day Select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {internalDate ? internalDate.getDate() : 'Hari'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={internalDate}
              onSelect={handleDateSelect}
              month={internalDate || new Date()}
              disabled={(date) => date > new Date() || date < new Date(`${fromYear}-01-01`)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
