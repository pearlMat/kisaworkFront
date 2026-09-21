import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('rounded-2xl border border-gray-100 bg-white shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('border-b border-gray-100 px-5 py-4', className)}
      {...props}
    />
  )
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={twMerge('p-5', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('border-t border-gray-100 px-5 py-4', className)}
      {...props}
    />
  )
}
