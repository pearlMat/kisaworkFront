import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore, type AuthUser } from '@/stores/useAuthStore'
import api from '@/lib/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post<{ data: AuthUser; message: string }>('/auth/login', {
        email,
        password,
      })
      loginUser(data.data)
      navigate('/admin/dashboard')
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? 'Invalid email or password.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f0520 0%, #1e0a3c 45%, #3b0764 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(107,33,168,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #6b21a8, #581c87)' }}
          >
            <span className="text-lg font-bold text-white">K</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">KISA Work Solutions</p>
            <p className="mt-0.5 text-xs text-white/40">Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-6 text-base font-semibold text-white">Sign in to continue</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.07] py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/25 transition focus:border-primary-500/60 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary-500/40"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Password</label>
              <div className="relative">
                <Lock
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.07] py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/25 transition focus:border-primary-500/60 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary-500/40"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-60"
              style={{
                background: loading
                  ? 'rgba(107,33,168,0.5)'
                  : 'linear-gradient(135deg, #7e22ce, #6b21a8)',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          © {new Date().getFullYear()} KISA Work Solutions
        </p>
      </div>
    </div>
  )
}
