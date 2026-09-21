import React from 'react'
import { tv, type VariantProps } from '../utils'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    variant: {
      solid: 'bg-primary-600 text-white hover:bg-primary-700',
      outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
      ghost: 'text-gray-700 hover:bg-gray-100',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
      xl: 'px-6 py-3 text-base',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, isLoading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled ?? isLoading}
      className={buttonVariants({ variant, size, class: className })}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
