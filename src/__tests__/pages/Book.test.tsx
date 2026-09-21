import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

vi.mock('@/images/book.jpeg', () => ({ default: '' }))
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))
vi.mock('@/lib/api', () => ({
  default: { post: vi.fn() },
}))

import Book from '@/pages/Book'
import api from '@/lib/api'
import toast from 'react-hot-toast'

const renderBook = () => render(<MemoryRouter><Book /></MemoryRouter>)

// Make timing check pass: mount time = 0, submit time = real timestamp >> 2500
const passTimingCheck = () =>
  vi.spyOn(Date, 'now').mockReturnValueOnce(0)

describe('Book form — validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    passTimingCheck()
  })

  afterEach(() => vi.restoreAllMocks())

  it('shows errors for all empty required fields on submit', async () => {
    const user = userEvent.setup()
    renderBook()
    await user.click(screen.getByRole('button', { name: 'book.submit' }))
    expect(screen.getByText('book.errors.service')).toBeInTheDocument()
    expect(screen.getByText('book.errors.name')).toBeInTheDocument()
    expect(screen.getByText('book.errors.emailRequired')).toBeInTheDocument()
  })

  it('shows email format error for an invalid email', async () => {
    const user = userEvent.setup()
    renderBook()
    await user.type(screen.getByPlaceholderText('book.fields.emailPlaceholder'), 'notanemail')
    await user.click(screen.getByRole('button', { name: 'book.submit' }))
    expect(screen.getByText('book.errors.emailInvalid')).toBeInTheDocument()
  })
})

describe('Book form — spam protection', () => {
  beforeEach(() => vi.clearAllMocks())
  afterEach(() => vi.restoreAllMocks())

  it('silently fakes success when the honeypot field is filled', async () => {
    passTimingCheck()
    const user = userEvent.setup()
    renderBook()
    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]')!
    await user.type(honeypot, 'http://spam.com')
    await user.click(screen.getByRole('button', { name: 'book.submit' }))
    expect(api.post).not.toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalled()
  })

  it('silently fakes success when the form is submitted too quickly', async () => {
    // Both mount and submit return 0 → difference = 0 < 2500ms
    vi.spyOn(Date, 'now').mockReturnValue(0)
    const user = userEvent.setup()
    renderBook()
    await user.click(screen.getByRole('button', { name: 'book.submit' }))
    expect(api.post).not.toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalled()
  })
})

describe('Book form — submission', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    passTimingCheck()
    ;(api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: {} })
  })

  afterEach(() => vi.restoreAllMocks())

  const fillAndSubmit = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.selectOptions(screen.getByRole('combobox'), 'COUNSELING')
    // datetime-local inputs don't support userEvent.type — use fireEvent
    fireEvent.change(document.querySelector('input[type="datetime-local"]')!, {
      target: { value: '2026-12-01T10:00' },
    })
    await user.type(screen.getByPlaceholderText('book.fields.namePlaceholder'), 'Jane Doe')
    await user.type(screen.getByPlaceholderText('book.fields.emailPlaceholder'), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: 'book.submit' }))
  }

  it('calls the API with a FormData payload on valid submission', async () => {
    const user = userEvent.setup()
    renderBook()
    await fillAndSubmit(user)
    await waitFor(() => expect(api.post).toHaveBeenCalled())
    const [url, fd] = (api.post as ReturnType<typeof vi.fn>).mock.calls[0] as [string, FormData]
    expect(url).toBe('/bookings')
    expect(fd).toBeInstanceOf(FormData)
    expect(fd.get('fullName')).toBe('Jane Doe')
    expect(fd.get('email')).toBe('jane@example.com')
    expect(fd.get('service')).toBe('COUNSELING')
  })

  it('shows a success toast after a successful submission', async () => {
    const user = userEvent.setup()
    renderBook()
    await fillAndSubmit(user)
    await waitFor(() => expect(toast.success).toHaveBeenCalled())
  })

  it('shows an error toast when the API fails', async () => {
    ;(api.post as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'))
    const user = userEvent.setup()
    renderBook()
    await fillAndSubmit(user)
    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })

  it('resets the form after a successful submission', async () => {
    const user = userEvent.setup()
    renderBook()
    await fillAndSubmit(user)
    await waitFor(() => {
      expect(screen.getByPlaceholderText('book.fields.namePlaceholder')).toHaveValue('')
      expect(screen.getByPlaceholderText('book.fields.emailPlaceholder')).toHaveValue('')
    })
  })
})
