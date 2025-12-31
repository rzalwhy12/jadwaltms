    import { Schedule } from '@/types/schedule';

    const APP_ID = '927536DC-AD92-4C9D-8881-7E83DDC2933E';
    const API_KEY = '4667311D-FC29-41C6-AC6A-28050A618CDE';
    const SERVER_URL = 'https://showybrass-us.backendless.app';
    const TABLE_NAME = 'Schedule';

    // Base URL untuk Backendless REST API
    const BACKENDLESS_API = `${SERVER_URL}/api/data/${TABLE_NAME}`;

    export const backendlessService = {
    // Fetch all schedules with pagination support for large datasets
    async getAllSchedules(): Promise<Schedule[]> {
        try {
        const allResults: Schedule[] = [];
        let pageSize = 100; // Fetch 100 items per request
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
            const url = `${BACKENDLESS_API}?pageSize=${pageSize}&offset=${offset}`;
            
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Backendless-Application-Id': APP_ID,
                'X-Backendless-REST-Registration-Token': API_KEY,
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const results = Array.isArray(data) ? data : data.data || [];
            
            if (results.length === 0) {
            hasMore = false;
            break;
            }

            const mappedResults = results.map((item: any) => ({
            id: item.objectId,
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime,
            instrument: item.instrument,
            studentName: item.studentName,
            teacherName: item.teacherName,
            }));

            allResults.push(...mappedResults);

            // If we got less than pageSize, we've reached the end
            if (results.length < pageSize) {
            hasMore = false;
            } else {
            offset += pageSize;
            }
        }

        return allResults;
        } catch (error) {
        console.error('Failed to fetch schedules from Backendless:', error);
        throw error;
        }
    },

    // Create a new schedule
    async createSchedule(schedule: Omit<Schedule, 'id'>): Promise<Schedule> {
        try {
        const response = await fetch(BACKENDLESS_API, {
            method: 'POST',
            headers: {
            'X-Backendless-Application-Id': APP_ID,
            'X-Backendless-REST-Registration-Token': API_KEY,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            day: schedule.day,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            instrument: schedule.instrument,
            studentName: schedule.studentName,
            teacherName: schedule.teacherName,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return {
            id: data.objectId,
            day: data.day,
            startTime: data.startTime,
            endTime: data.endTime,
            instrument: data.instrument,
            studentName: data.studentName,
            teacherName: data.teacherName,
        };
        } catch (error) {
        console.error('Failed to create schedule in Backendless:', error);
        throw error;
        }
    },

    // Update a schedule
    async updateSchedule(id: string, schedule: Omit<Schedule, 'id'>): Promise<Schedule> {
        try {
        const response = await fetch(`${BACKENDLESS_API}/${id}`, {
            method: 'PUT',
            headers: {
            'X-Backendless-Application-Id': APP_ID,
            'X-Backendless-REST-Registration-Token': API_KEY,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            day: schedule.day,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            instrument: schedule.instrument,
            studentName: schedule.studentName,
            teacherName: schedule.teacherName,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return {
            id: data.objectId || id,
            day: data.day,
            startTime: data.startTime,
            endTime: data.endTime,
            instrument: data.instrument,
            studentName: data.studentName,
            teacherName: data.teacherName,
        };
        } catch (error) {
        console.error('Failed to update schedule in Backendless:', error);
        throw error;
        }
    },

    // Delete a schedule
    async deleteSchedule(id: string): Promise<void> {
        try {
        const response = await fetch(`${BACKENDLESS_API}/${id}`, {
            method: 'DELETE',
            headers: {
            'X-Backendless-Application-Id': APP_ID,
            'X-Backendless-REST-Registration-Token': API_KEY,
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        } catch (error) {
        console.error('Failed to delete schedule in Backendless:', error);
        throw error;
        }
    },

    // Sync schedules
    async syncSchedules(schedules: Schedule[]): Promise<void> {
        try {
        for (const schedule of schedules) {
            if (schedule.id.startsWith('local_')) {
            // Create new schedule
            await this.createSchedule({
                day: schedule.day,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                instrument: schedule.instrument,
                studentName: schedule.studentName,
                teacherName: schedule.teacherName,
            });
            } else {
            // Update existing schedule
            await this.updateSchedule(schedule.id, {
                day: schedule.day,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                instrument: schedule.instrument,
                studentName: schedule.studentName,
                teacherName: schedule.teacherName,
            });
            }
        }
        console.log('Schedules synced to Backendless');
        } catch (error) {
        console.error('Failed to sync schedules:', error);
        throw error;
        }
    },
    };