export type Day = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';

export type Instrument = 'Piano' | 'Gitar' | 'Biola' | 'Drum' | 'Vokal' | 'Bass' | 'Keyboard';

export interface Schedule {
  id: string;
  day: Day;
  startTime: string;
  endTime: string;
  instrument: Instrument;
  studentName: string;
}

export type SortBy = 'day' | 'time';

export const DAYS: Day[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const INSTRUMENTS: Instrument[] = ['Piano', 'Gitar', 'Biola', 'Drum', 'Vokal', 'Bass', 'Keyboard'];

export const DAY_ORDER: Record<Day, number> = {
  'Senin': 1,
  'Selasa': 2,
  'Rabu': 3,
  'Kamis': 4,
  'Jumat': 5,
  'Sabtu': 6,
  'Minggu': 7,
};
