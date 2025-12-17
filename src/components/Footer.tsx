    import { Music, Heart } from 'lucide-react';

    export default function Footer() {
    return (
        <footer className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 mt-auto pb-4 md:pb-6 mb-4 md:mb-6">
        <div className=" mx-auto pl-4 pr-8 sm:pl-6 sm:pr-12 lg:pl-8 lg:pr-16 py-8 md:py-10">
            <div className="flex flex-col items-center justify-center text-center text-white">
            <Music className="w-12 h-12 md:w-14 md:h-14 mb-3" />
            <p className="text-base md:text-lg font-semibold mb-2">© 2025 Tulungagung Music School</p>
            <p className="text-xs sm:text-sm opacity-90 mb-4 inline-flex items-center gap-1">Made with <Heart className="w-3 h-3 fill-current" /> for music education • Empowering musicians since 2025</p>
            </div>
        </div>
        </footer>
    );
    }
