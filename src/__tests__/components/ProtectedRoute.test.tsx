import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

vi.mock('@/lib/api', () => ({
  default: { get: vi.fn() },
}))

import ProtectedRoute from '@/components/ProtectedRoute'
import api from '@/lib/api'

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/admin" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  )

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('shows a loading spinner while the session is being verified', () => {
    // Never resolves — keeps component in checking state
    ;(api.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}))
    renderWithRouter()
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('redirects to /admin when the session check fails', async () => {
    ;(api.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('401'))
    renderWithRouter()
    await waitFor(() =>
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    )
  })

  it('renders the protected page when the session is valid', async () => {
    ;(api.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { data: { id: '1', email: 'admin@kisa.com', role: 'SUPERADMIN' } },
    })
    renderWithRouter()
    await waitFor(() =>
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    )
  })

  it('does not render protected content while checking', () => {
    ;(api.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}))
    renderWithRouter()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
