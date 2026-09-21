export type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface Booking {
  id: string
  fullName: string
  email: string
  phone?: string | null
  service: string
  preferredDates: string[]
  message?: string | null
  status: Status
  adminNote?: string | null
  createdAt: string
  updatedAt: string
}

export const SERVICE_LABELS: Record<string, string> = {
  COUNSELING: 'Individual Counseling',
  SOCIAL_CONSULTING: 'Social Consulting',
  STUDENT_VISA: 'Student Visa',
}
