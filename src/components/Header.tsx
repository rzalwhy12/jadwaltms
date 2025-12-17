    import { Music } from 'lucide-react';

    export default function Header() {
    return (
        <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b-4 border-purple-500 relative buttom-5 z-50 pt-8 md:pt-10 pb-6 md:pb-8">
        <div className=" mx-auto pl-4 pr-8 sm:pl-6 sm:pr-12 lg:pl-8 lg:pr-16 py-6 md:py-8">
            <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3">
                <Music className="w-14 h-14 md:w-16 md:h-16 text-purple-600 dark:text-purple-400 mx-auto" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Tulungagung Music School
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300">
                Sistem Manajemen Jadwal Les Musik
            </p>
            </div>
        </div>
        </header>
    );
    }
