import { Outlet, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  FileEdit,
  Settings,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import api from '@/lib/api'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/bookings',  label: 'Bookings',  Icon: CalendarCheck  },
  { to: '/admin/inquiries', label: 'Inquiries', Icon: MessageSquare  },
  { to: '/admin/content',   label: 'Content',   Icon: FileEdit       },
  { to: '/admin/settings',  label: 'Settings',  Icon: Settings       },
]

export default function AdminLayout() {
  const logout = useAuthStore((s) => s.logout)

  async function handleLogout() {
    try { await api.post('/auth/logout') } catch { /* ignore */ }
    logout()
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className="flex w-60 shrink-0 flex-col"
        style={{ background: 'linear-gradient(180deg, #0f0520 0%, #140628 100%)' }}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 shadow-lg">
            <span className="text-xs font-bold text-white">K</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-white">KISA Admin</p>
            <p className="mt-0.5 text-[10px] text-white/35">Work Solutions</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-px px-2.5 py-4">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-300 ring-1 ring-inset ring-primary-500/20'
                    : 'text-white/45 hover:bg-white/[0.06] hover:text-white/80'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/[0.06] px-2.5 pb-5 pt-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/35 transition-all hover:bg-white/[0.06] hover:text-white/65"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
