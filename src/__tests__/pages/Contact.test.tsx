import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

vi.mock('@/images/contact.jpeg', () => ({ default: '' }))
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))
vi.mock('@/lib/api', () => ({
  default: { post: vi.fn() },
}))

import Contact from '@/pages/Contact'
import api from '@/lib/api'
import toast from 'react-hot-toast'

const renderContact = () => render(<MemoryRouter><Contact /></MemoryRouter>)

// Make timing check pass
const passTimingCheck = () =>
  vi.spyOn(Date, 'now').mockReturnValueOnce(0)

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('contact.form.namePlaceholder'), 'John Smith')
  await user.type(screen.getByPlaceholderText('contact.form.emailPlaceholder'), 'john@example.com')
  await user.type(screen.getByPlaceholderText('contact.form.subjectPlaceholder'), 'General inquiry')
  await user.type(screen.getByPlaceholderText('contact.form.messagePlaceholder'), 'Hello, I would like to learn more.')
}

describe('Contact form — spam protection', () => {
  beforeEach(() => vi.clearAllMocks())
  afterEach(() => vi.restoreAllMocks())

  it('silently fakes success when the honeypot field is filled', async () => {
    passTimingCheck()
    const user = userEvent.setup()
    renderContact()
    // Simulate a bot: fills all visible fields AND the hidden honeypot
    await fillForm(user)
    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]')!
    await user.type(honeypot, 'http://spam.com')
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => expect(toast.success).toHaveBeenCalled())
    expect(api.post).not.toHaveBeenCalled()
  })

  it('silently fakes success when submitted too quickly', async () => {
    // Both mount and submit return 0 → difference = 0 < 2500ms
    vi.spyOn(Date, 'now').mockReturnValue(0)
    const user = userEvent.setup()
    renderContact()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => expect(toast.success).toHaveBeenCalled())
    expect(api.post).not.toHaveBeenCalled()
  })
})

describe('Contact form — submission', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    passTimingCheck()
    ;(api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: {} })
  })

  afterEach(() => vi.restoreAllMocks())

  it('calls the API with a FormData payload on valid submission', async () => {
    const user = userEvent.setup()
    renderContact()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => expect(api.post).toHaveBeenCalled())
    const [url, fd] = (api.post as ReturnType<typeof vi.fn>).mock.calls[0] as [string, FormData]
    expect(url).toBe('/inquiries')
    expect(fd).toBeInstanceOf(FormData)
    expect(fd.get('name')).toBe('John Smith')
    expect(fd.get('email')).toBe('john@example.com')
    expect(fd.get('subject')).toBe('General inquiry')
  })

  it('shows a success toast on successful submission', async () => {
    const user = userEvent.setup()
    renderContact()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => expect(toast.success).toHaveBeenCalled())
  })

  it('shows an error toast when the API fails', async () => {
    ;(api.post as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server error'))
    const user = userEvent.setup()
    renderContact()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })

  it('clears the form after a successful submission', async () => {
    const user = userEvent.setup()
    renderContact()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'contact.form.send' }))
    await waitFor(() => {
      expect(screen.getByPlaceholderText('contact.form.namePlaceholder')).toHaveValue('')
      expect(screen.getByPlaceholderText('contact.form.messagePlaceholder')).toHaveValue('')
    })
  })
})
