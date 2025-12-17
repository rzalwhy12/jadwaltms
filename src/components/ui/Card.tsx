    import React from 'react';

    interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    }

    export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
        return (
            <div
                className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 print:shadow-none print:border print:border-black print:rounded-none print:bg-white ${className}`}
            >
                {title && (
                    <div className="px-6 py-5 border-b-2 bg-linear-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded-t-2xl text-center print:py-0 print:px-0 print:bg-white print:border-b print:border-black print:rounded-none print:m-0">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 print:text-sm print:font-bold print:mb-0 print:py-0">{title}</h3>
                    </div>
                )}
                <div className="p-6 md:p-8 space-y-6 print:p-0 print:space-y-0">{children}</div>
            </div>
        );
    };

