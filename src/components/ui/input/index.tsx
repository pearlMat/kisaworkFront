import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={twMerge(
        'block w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-1',
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
          : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export interface FormFieldProps {
  label?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={twMerge('space-y-1', className)}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
