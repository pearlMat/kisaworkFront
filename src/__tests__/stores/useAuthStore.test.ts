import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/useAuthStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('starts unauthenticated with no user', () => {
    const { user, isAuthenticated } = useAuthStore.getState()
    expect(user).toBeNull()
    expect(isAuthenticated).toBe(false)
  })

  it('loginUser stores the user and sets isAuthenticated to true', () => {
    const user = { id: '1', email: 'admin@kisa.com', role: 'SUPERADMIN' as const }
    useAuthStore.getState().loginUser(user)
    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.isAuthenticated).toBe(true)
  })

  it('logout clears the user and sets isAuthenticated to false', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'admin@kisa.com', role: 'SUPERADMIN' },
      isAuthenticated: true,
    })
    useAuthStore.getState().logout()
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('loginUser stores STAFF role correctly', () => {
    const user = { id: '2', email: 'staff@kisa.com', role: 'STAFF' as const }
    useAuthStore.getState().loginUser(user)
    expect(useAuthStore.getState().user?.role).toBe('STAFF')
  })
})
