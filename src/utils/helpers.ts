import { Schedule, Day, DAY_ORDER, SortBy } from '@/types/schedule';

export const sortSchedules = (schedules: Schedule[], sortBy: SortBy): Schedule[] => {
  return [...schedules].sort((a, b) => {
    if (sortBy === 'day') {
      const dayDiff = DAY_ORDER[a.day] - DAY_ORDER[b.day];
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    } else {
      const timeDiff = a.startTime.localeCompare(b.startTime);
      if (timeDiff !== 0) return timeDiff;
      return DAY_ORDER[a.day] - DAY_ORDER[b.day];
    }
  });
};

export const filterSchedulesByDay = (schedules: Schedule[], day: Day | 'Semua'): Schedule[] => {
  if (day === 'Semua') return schedules;
  return schedules.filter(schedule => schedule.day === day);
};

export const filterSchedulesByInstrument = (schedules: Schedule[], instrument: string): Schedule[] => {
  if (instrument === 'Semua') return schedules;
  return schedules.filter(schedule => schedule.instrument === instrument);
};

export const filterSchedulesByTeacher = (schedules: Schedule[], teacher: string): Schedule[] => {
  if (teacher === 'Semua') return schedules;
  return schedules.filter(schedule => schedule.teacherName === teacher);
};

export const getAvailableTeachers = (schedules: Schedule[]): string[] => {
  const teachers = new Set(schedules.map(schedule => schedule.teacherName));
  return Array.from(teachers).sort();
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};
