'use client';

import React, { useState } from 'react';
import { Schedule } from '@/types/schedule';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { formatTimeRange } from '@/utils/helpers';
import { Printer, Edit2, Trash2, Calendar, Clock, Music, User, ChevronDown } from 'lucide-react';

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

const instrumentIcons: Record<string, React.ReactNode> = {
  Piano: <Music className="w-4 h-4" />,
  Gitar: <Music className="w-4 h-4" />,
  Biola: <Music className="w-4 h-4" />,
  Drum: <Music className="w-4 h-4" />,
  Vokal: <Music className="w-4 h-4" />,
  Bass: <Music className="w-4 h-4" />,
  Keyboard: <Music className="w-4 h-4" />,
};

const ITEMS_PER_PAGE = 15;

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedules,
  onEdit,
  onDelete,
}) => {
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);

  const handlePrint = () => {
    window.print();
  };

  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + ITEMS_PER_PAGE);
  };

  const displayedSchedules = schedules.slice(0, displayedCount);
  const hasMore = displayedCount < schedules.length;

  if (schedules.length === 0) {
    return (
      <Card>
        <div className="text-center py-16 md:py-20">
          <div className="text-7xl md:text-8xl mb-6">📅</div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            Belum Ada Jadwal
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
            Silakan tambahkan jadwal les baru menggunakan form di atas
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="mb-8 md:mb-10 print:m-0 print:p-0">
    <div className="print:block hidden text-center mb-4 print:mb-0 print:mt-0 print:py-0 print-heading">
      <h1 className="text-4xl font-black text-black mb-1 print:mb-0 print:text-xl">Tulungagung Music School</h1>
      <p className="text-lg font-medium text-gray-700 print:text-black print:mb-0 print:text-sm">Jadwal Les Musik</p>
    </div>
    <Card title="Daftar Jadwal Les Musik" className="print:mt-0 print:mb-0 print:border-t-0 print:border-0 print:p-0">
      <div className="overflow-x-auto -mx-6 sm:mx-0 print:m-0 print:p-0 print:overflow-visible">
        <div className="inline-block min-w-full align-middle print:w-full print:m-0 print:p-0">
          <div className="overflow-hidden print:overflow-visible print:m-0 print:p-0 print:border-0">
            <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700 print:divide-y print:divide-black">
              <thead className="bg-linear-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-900 dark:to-gray-700 print:bg-white print:border-b print:border-black print:py-0">
                <tr className="print:py-1">
                  <th className="px-4 py-5 md:py-6 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider print:px-3 print:py-1 print:text-xs print:font-semibold">
                    Hari
                  </th>
                  <th className="px-4 py-5 md:py-6 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider print:px-3 print:py-1 print:text-xs print:font-semibold">
                    Jam
                  </th>
                  <th className="px-4 py-5 md:py-6 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider print:px-3 print:py-1 print:text-xs print:font-semibold">
                    Instrumen
                  </th>
                  <th className="px-4 py-5 md:py-6 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider print:px-3 print:py-1 print:text-xs print:font-semibold">
                    Nama Siswa / Grup
                  </th>
                  <th className="px-4 py-5 md:py-6 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider print:table-cell print:text-black print:px-3 print:py-1 print:text-xs print:font-semibold">
                    <span className="print:hidden">Aksi</span>
                    <span className="hidden print:inline">Tanda Tangan</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayedSchedules.map((schedule, index) => (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-purple-50 dark:hover:bg-purple-900/20 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                    } ${index > 0 && index % 15 === 0 ? 'print:break-before-page' : ''}`}
                  >
                    <td className="px-4 py-5 md:py-6 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        <Calendar className="w-3 h-3 mr-1.5" /> {schedule.day}
                      </span>
                    </td>
                    <td className="px-4 py-5 md:py-6 whitespace-nowrap text-center text-gray-700 dark:text-gray-300">
                      <span className="font-mono text-xs sm:text-sm font-medium inline-flex items-center">
                        <Clock className="w-3 h-3 mr-1.5" /> {formatTimeRange(schedule.startTime, schedule.endTime)}
                      </span>
                    </td>
                    <td className="px-4 py-5 md:py-6 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        {instrumentIcons[schedule.instrument] || <Music className="w-4 h-4" />} {schedule.instrument}
                      </span>
                    </td>
                    <td className="px-4 py-5 md:py-6 text-center text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                      <span className="inline-flex items-center justify-center">
                        <User className="w-4 h-4 mr-1.5" /> {schedule.studentName}
                      </span>
                    </td>
                    <td className="px-4 py-5 md:py-6 whitespace-nowrap print:table-cell">
                      <div className="flex gap-2 justify-center items-center print:hidden">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onEdit(schedule)}
                          className="inline-flex items-center justify-center gap-1.5 min-w-18.75"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            if (confirm(`Hapus jadwal les ${schedule.studentName}?`)) {
                              onDelete(schedule.id);
                            }
                          }}
                          className="inline-flex items-center justify-center gap-1.5 min-w-18.75"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </Button>
                      </div>
                      <div className="hidden print:block print:text-center">
                        <div className="print:border-b print:border-black print:h-12 print:w-32 print:mx-auto"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700 bg-linear-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-900 dark:to-gray-700 -mx-6 px-6 py-4 rounded-b-2xl print:bg-white print:hidden">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium print:text-black">
            Total: <span className="font-bold text-purple-600 dark:text-purple-400 text-lg print:text-black">{schedules.length}</span> jadwal les terdaftar
          </p>
          <div className="print:hidden flex flex-wrap gap-2">
            {hasMore && (
              <Button 
                variant="secondary" 
                onClick={handleLoadMore} 
                size="sm"
                className="inline-flex items-center justify-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                <span>Tampilkan Lebih Banyak</span>
              </Button>
            )}
            <Button 
              variant="primary" 
              onClick={handlePrint} 
              size="sm"
              className="inline-flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Jadwal</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};
