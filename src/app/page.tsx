'use client';

import { useState, useMemo, useEffect } from 'react';
import { Schedule, Day, Instrument, SortBy } from '../types/schedule';
import { ScheduleForm } from '../components/ScheduleForm';
import { ScheduleTable } from '../components/ScheduleTable';
import { FilterControls } from '../components/FilterControls';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { 
  sortSchedules, 
  filterSchedulesByDay, 
  filterSchedulesByInstrument, 
  generateId 
} from '../utils/helpers';

export default function Home() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day | 'Semua'>('Semua');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | 'Semua'>('Semua');
  const [sortBy, setSortBy] = useState<SortBy>('day');
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tms-schedules');
    if (saved) {
      try {
        setSchedules(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load schedules:', e);
      }
    } else {
      const sampleSchedules: Schedule[] = [
        { id: generateId(), day: 'Senin', startTime: '08:00', endTime: '09:00', instrument: 'Piano', studentName: 'John Doe' },
        { id: generateId(), day: 'Senin', startTime: '10:00', endTime: '11:00', instrument: 'Gitar', studentName: 'Jane Smith' },
        { id: generateId(), day: 'Rabu', startTime: '09:00', endTime: '10:00', instrument: 'Biola', studentName: 'Grup A' },
        { id: generateId(), day: 'Jumat', startTime: '15:00', endTime: '16:00', instrument: 'Drum', studentName: 'Michael Johnson' },
      ];
      setSchedules(sampleSchedules);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tms-schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  const handleAddSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    const newSchedule: Schedule = { ...scheduleData, id: generateId() };
    setSchedules((prev) => [...prev, newSchedule]);
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const handleUpdateSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    if (!editingSchedule) return;
    setSchedules((prev) => prev.map((s) => (s.id === editingSchedule.id ? { ...scheduleData, id: editingSchedule.id } : s)));
    setEditingSchedule(null);
    setIsModalOpen(false);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    if (editingSchedule?.id === id) setEditingSchedule(null);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const filteredAndSortedSchedules = useMemo(() => {
    let result = schedules;
    result = filterSchedulesByDay(result, selectedDay);
    result = filterSchedulesByInstrument(result, selectedInstrument);
    result = sortSchedules(result, sortBy);
    return result;
  }, [schedules, selectedDay, selectedInstrument, sortBy]);

  const openCreateModal = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const isEditingMode = !!editingSchedule;

  return (
    <div className="space-y-12 md:space-y-16">

      <FilterControls
        selectedDay={selectedDay}
        selectedInstrument={selectedInstrument}
        sortBy={sortBy}
        onDayChange={setSelectedDay}
        onInstrumentChange={setSelectedInstrument}
        onSortChange={setSortBy}
      />

      <ScheduleTable
        schedules={filteredAndSortedSchedules}
        onEdit={handleEditSchedule}
        onDelete={handleDeleteSchedule}
      />

      <button
        type="button"
        onClick={openCreateModal}
        aria-label="Tambah jadwal baru"
        className="fixed bottom-28 md:bottom-32 right-6 md:right-8 h-14 w-14 md:h-16 md:w-16 rounded-full bg-linear-to-r from-blue-500 via-purple-600 to-pink-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-700 z-40 print:hidden flex items-center justify-center"
      >
        <Plus className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 px-3.5 py-2 text-lg font-extrabold shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Tutup"
            >
              ✕
            </button>
            <ScheduleForm
              onSubmit={isEditingMode ? handleUpdateSchedule : handleAddSchedule}
              onCancel={closeModal}
              initialData={editingSchedule || undefined}
              isEditing={isEditingMode}
              noSpacing
            />
          </div>
        </div>
      )}
    </div>
  );
}
