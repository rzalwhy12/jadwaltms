    'use client';

    import React, { useState, useEffect } from 'react';
    import { Schedule, Day, Instrument, DAYS, INSTRUMENTS } from '@/types/schedule';
    import { Button } from './ui/Button';
    import { Input } from './ui/Input';
    import { Select } from './ui/Select';
    import { Card } from './ui/Card';
    import { Plus, Save, X, Edit } from 'lucide-react';

    interface ScheduleFormProps {
    onSubmit: (schedule: Omit<Schedule, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Schedule;
    isEditing?: boolean;
    noSpacing?: boolean;
    }

    export const ScheduleForm: React.FC<ScheduleFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false,
    noSpacing = false,
    }) => {
    const [formData, setFormData] = useState({
        day: (initialData?.day || 'Senin') as Day,
        startTime: initialData?.startTime || '',
        endTime: initialData?.endTime || '',
        instrument: (initialData?.instrument || 'Piano') as Instrument,
        studentName: initialData?.studentName || '',
        teacherName: initialData?.teacherName || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
        setFormData({
            day: initialData.day,
            startTime: initialData.startTime,
            endTime: initialData.endTime,
            instrument: initialData.instrument,
            studentName: initialData.studentName,
            teacherName: initialData.teacherName,
        });
        }
    }, [initialData]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.studentName.trim()) {
        newErrors.studentName = 'Nama siswa harus diisi';
        }

        if (!formData.teacherName.trim()) {
        newErrors.teacherName = 'Nama pengajar harus diisi';
        }

        if (!formData.startTime) {
        newErrors.startTime = 'Jam mulai harus diisi';
        }

        if (!formData.endTime) {
        newErrors.endTime = 'Jam selesai harus diisi';
        }

        if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
        newErrors.endTime = 'Jam selesai harus lebih besar dari jam mulai';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
        onSubmit(formData);
        if (!isEditing) {
            setFormData({
            day: 'Senin',
            startTime: '',
            endTime: '',
            instrument: 'Piano',
            studentName: '',
            teacherName: '',
            });
        }
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const wrapperClass = noSpacing ? '' : 'mt-10 mb-12 md:mt-12 md:mb-16';

    return (
        <div className={wrapperClass}>
        <Card title={isEditing ? 'Edit Jadwal Les' : 'Tambah Jadwal Les Baru'}>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
                label="Hari"
                value={formData.day}
                onChange={(e) => handleChange('day', e.target.value)}
                options={DAYS.map((day) => ({ value: day, label: day }))}
            />

            <Select
                label="Instrumen"
                value={formData.instrument}
                onChange={(e) => handleChange('instrument', e.target.value)}
                options={INSTRUMENTS.map((instrument) => ({ value: instrument, label: instrument }))}
            />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
                label="Jam Mulai"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                error={errors.startTime}
            />

            <Input
                label="Jam Selesai"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                error={errors.endTime}
            />
            </div>

            <Input
            label="Nama Siswa / Grup"
            type="text"
            placeholder="Masukkan nama siswa atau grup"
            value={formData.studentName}
            onChange={(e) => handleChange('studentName', e.target.value)}
            error={errors.studentName}
            />

            <Input
            label="Nama Pengajar"
            type="text"
            placeholder="Masukkan nama pengajar"
            value={formData.teacherName}
            onChange={(e) => handleChange('teacherName', e.target.value)}
            error={errors.teacherName}
            />

            <div className="flex gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <Button type="submit" variant="success" className="flex-1 text-base md:text-lg font-bold inline-flex items-center justify-center">
                {isEditing ? <><Save className="w-4 h-4 mr-2" /> Simpan Perubahan</> : <><Plus className="w-4 h-4 mr-2" /> Tambah Jadwal</>}
            </Button>
            {isEditing && onCancel && (
                <Button type="button" variant="secondary" onClick={onCancel} className="text-base md:text-lg font-bold inline-flex items-center justify-center">
                <X className="w-4 h-4 mr-2" /> Batal
                </Button>
            )}
            </div>
        </form>
        </Card>
        </div>
    );
    };
