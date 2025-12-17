import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700 focus:border-purple-500 dark:focus:border-purple-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm hover:shadow-md ${
          error ? 'border-red-500 focus:ring-red-300' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
};
