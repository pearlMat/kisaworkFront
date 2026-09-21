export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'

export interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string | null
  subject: string
  message: string
  status: InquiryStatus
  isRead: boolean
  createdAt: string
  updatedAt: string
}
