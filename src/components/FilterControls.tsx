    'use client';

    import React from 'react';
    import { Day, Instrument, DAYS, INSTRUMENTS, SortBy, Schedule } from '@/types/schedule';
    import { Button } from './ui/Button';
    import { Select } from './ui/Select';
    import { Card } from './ui/Card';
    import { Target, Calendar, Music, ArrowUpDown, Users } from 'lucide-react';

    interface FilterControlsProps {
    selectedDay: Day | 'Semua';
    selectedInstrument: Instrument | 'Semua';
    selectedTeacher: string | 'Semua';
    sortBy: SortBy;
    onDayChange: (day: Day | 'Semua') => void;
    onInstrumentChange: (instrument: Instrument | 'Semua') => void;
    onTeacherChange: (teacher: string | 'Semua') => void;
    onSortChange: (sortBy: SortBy) => void;
    availableTeachers: string[];
    }

    export const FilterControls: React.FC<FilterControlsProps> = ({
    selectedDay,
    selectedInstrument,
    selectedTeacher,
    sortBy,
    onDayChange,
    onInstrumentChange,
    onTeacherChange,
    onSortChange,
    availableTeachers,
    }) => {
    const allDays: (Day | 'Semua')[] = ['Semua', ...DAYS];

    return (
        <div className="mt-8 md:mt-10 print:hidden">
        <Card title="Filter & Urutkan Jadwal">
        <div className="space-y-6">
        {/* Day Filter Buttons */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 items-center">
            <Calendar className="w-4 h-4 mr-2" /> Pilih Hari
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {allDays.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onDayChange(day)}
                className="w-full"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>            {/* Instrument Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <Select
                label="Filter Instrumen"
                value={selectedInstrument}
                onChange={(e) => onInstrumentChange(e.target.value as Instrument | 'Semua')}
                options={[
                { value: 'Semua', label: 'Semua Instrumen' },
                ...INSTRUMENTS.map((instrument) => ({ value: instrument, label: instrument })),
                ]}
            />

            <Select
                label="Filter Pengajar"
                value={selectedTeacher}
                onChange={(e) => onTeacherChange(e.target.value)}
                options={[
                { value: 'Semua', label: 'Semua Pengajar' },
                ...availableTeachers.map((teacher) => ({ value: teacher, label: teacher })),
                ]}
            />

            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 items-center">
                <ArrowUpDown className="w-4 h-4 mr-2" /> Urutkan Berdasarkan
              </label>
                <div className="grid grid-cols-2 gap-2">
                <Button
                    variant={sortBy === 'day' ? 'primary' : 'outline'}
                    onClick={() => onSortChange('day')}
                    className="w-full"
                >
                    📆 Hari
                </Button>
                <Button
                    variant={sortBy === 'time' ? 'primary' : 'outline'}
                    onClick={() => onSortChange('time')}
                    className="w-full"
                >
                    ⏰ Jam
                </Button>
                </div>
            </div>
            </div>

            {/* Active Filters Display */}
            <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700 bg-linear-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-900 dark:to-gray-700 -mx-6 px-6 py-4 rounded-b-2xl">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                <span className="font-bold">✨ Filter Aktif:</span>{' '}
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mx-1">
                {selectedDay === 'Semua' ? 'Semua Hari' : selectedDay}
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 mx-1">
                {selectedInstrument === 'Semua' ? 'Semua Instrumen' : selectedInstrument}
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 mx-1">
                {selectedTeacher === 'Semua' ? 'Semua Pengajar' : selectedTeacher}
                </span>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 mx-1">
                Urut: {sortBy === 'day' ? 'Hari' : 'Jam'}
                </span>
            </p>
            </div>
        </div>
        </Card>
        </div>
    );
    };
