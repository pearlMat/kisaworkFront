import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore, type AuthUser } from '@/stores/useAuthStore'
import api from '@/lib/api'

const INACTIVITY_MS = 60 * 60 * 1000

export default function ProtectedRoute() {
  const { isAuthenticated, loginUser, logout } = useAuthStore()
  const [checking, setChecking] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Verify session with backend on mount
  useEffect(() => {
    api
      .get<{ data: AuthUser }>('/auth/me')
      .then(({ data }) => loginUser(data.data))
      .catch(() => logout())
      .finally(() => setChecking(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Inactivity auto-logout
  useEffect(() => {
    const reset = () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(logout, INACTIVITY_MS)
    }
    const events = ['mousemove', 'keydown', 'click', 'scroll'] as const
    events.forEach((e) => window.addEventListener(e, reset))
    reset()
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset))
      if (timer.current) clearTimeout(timer.current)
    }
  }, [logout])

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/admin" replace />
  return <Outlet />
}
