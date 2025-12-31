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
  filterSchedulesByTeacher,
  getAvailableTeachers,
  generateId 
} from '../utils/helpers';
import { backendlessService } from '../services/backendless';

export default function Home() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day | 'Semua'>('Semua');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | 'Semua'>('Semua');
  const [selectedTeacher, setSelectedTeacher] = useState<string | 'Semua'>('Semua');
  const [sortBy, setSortBy] = useState<SortBy>('day');
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load schedules from Backendless
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setIsLoading(true);
        const data = await backendlessService.getAllSchedules();
        setSchedules(data);
      } catch (error) {
        console.error('Failed to load schedules from Backendless:', error);
        // Fallback to localStorage if Backendless fails
        const saved = localStorage.getItem('tms-schedules');
        if (saved) {
          try {
            setSchedules(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to load schedules from localStorage:', e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, []);

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

  const handleAddSchedule = async (scheduleData: Omit<Schedule, 'id'>) => {
    try {
      const newSchedule = await backendlessService.createSchedule(scheduleData);
      setSchedules((prev) => [...prev, newSchedule]);
      setIsModalOpen(false);
      setEditingSchedule(null);
    } catch (error) {
      console.error('Failed to add schedule:', error);
      alert('Gagal menambahkan jadwal. Silakan coba lagi.');
    }
  };

  const handleUpdateSchedule = async (scheduleData: Omit<Schedule, 'id'>) => {
    if (!editingSchedule) return;
    try {
      const updated = await backendlessService.updateSchedule(editingSchedule.id, scheduleData);
      setSchedules((prev) => prev.map((s) => (s.id === editingSchedule.id ? updated : s)));
      setEditingSchedule(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update schedule:', error);
      alert('Gagal memperbarui jadwal. Silakan coba lagi.');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      await backendlessService.deleteSchedule(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      if (editingSchedule?.id === id) setEditingSchedule(null);
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      alert('Gagal menghapus jadwal. Silakan coba lagi.');
    }
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const filteredAndSortedSchedules = useMemo(() => {
    let result = schedules;
    result = filterSchedulesByDay(result, selectedDay);
    result = filterSchedulesByInstrument(result, selectedInstrument);
    result = filterSchedulesByTeacher(result, selectedTeacher);
    result = sortSchedules(result, sortBy);
    return result;
  }, [schedules, selectedDay, selectedInstrument, selectedTeacher, sortBy]);

  const availableTeachers = useMemo(() => {
    return getAvailableTeachers(schedules);
  }, [schedules]);

  const openCreateModal = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const isEditingMode = !!editingSchedule;

  if (isLoading) {
    return (
      <div className="space-y-12 md:space-y-16">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Memuat jadwal...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-16">

      <FilterControls
        selectedDay={selectedDay}
        selectedInstrument={selectedInstrument}
        selectedTeacher={selectedTeacher}
        sortBy={sortBy}
        onDayChange={setSelectedDay}
        onInstrumentChange={setSelectedInstrument}
        onTeacherChange={setSelectedTeacher}
        onSortChange={setSortBy}
        availableTeachers={availableTeachers}
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
