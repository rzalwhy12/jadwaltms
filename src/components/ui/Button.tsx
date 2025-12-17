import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-linear-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-2xl',
    secondary: 'bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl',
    danger: 'bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl',
    success: 'bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
