import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, Clock, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react'
import api from '@/lib/api'
import type { Booking } from '@/types/booking'
import { SERVICE_LABELS } from '@/types/booking'
import type { Inquiry } from '@/types/inquiry'
import { Badge } from '@/components/ui/badge'

interface BookingStats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
  completed: number
}

const STATUS_BADGE: Record<string, 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  CONFIRMED: 'success',
  CANCELLED: 'danger',
  COMPLETED: 'success',
}

function timeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [unreadCount, setUnreadCount] = useState<number | null>(null)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<{ data: BookingStats }>('/bookings/stats'),
      api.get<{ data: { count: number } }>('/inquiries/unread-count'),
      api.get<{ data: { bookings: Booking[] } }>('/bookings?limit=5'),
      api.get<{ data: { inquiries: Inquiry[] } }>('/inquiries?limit=5'),
    ])
      .then(([s, u, b, i]) => {
        setStats(s.data?.data ?? null)
        setUnreadCount(u.data?.data?.count ?? 0)
        setRecentBookings(b.data?.data?.bookings ?? [])
        setRecentInquiries(i.data?.data?.inquiries ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards: {
    label: string
    value: number | null | undefined
    icon: typeof CalendarCheck
    color: string
    href?: string
  }[] = [
    { label: 'Total Bookings', value: stats?.total,     icon: CalendarCheck,  color: 'text-primary-600 bg-primary-50' },
    { label: 'Pending',        value: stats?.pending,   icon: Clock,          color: 'text-yellow-600 bg-yellow-50',  href: '/admin/bookings' },
    { label: 'Unread Inquiries', value: unreadCount,    icon: MessageSquare,  color: 'text-purple-600 bg-purple-50',  href: '/admin/inquiries' },
    { label: 'Confirmed',      value: stats?.confirmed, icon: CheckCircle,    color: 'text-green-600 bg-green-50' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="mt-0.5 text-2xl font-bold text-gray-900">{timeGreeting()}</h1>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color, href }) => {
          const inner = (
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
                  {loading ? (
                    <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-100" />
                  ) : (
                    <p className="mt-1 text-3xl font-bold text-gray-900">{value ?? '—'}</p>
                  )}
                </div>
                <div className={`shrink-0 rounded-xl p-2.5 ${color}`}>
                  <Icon size={20} />
                </div>
              </div>
              {href && (
                <p className="mt-3 flex items-center gap-0.5 text-xs font-medium text-primary-600">
                  View all <ArrowRight size={11} />
                </p>
              )}
            </div>
          )
          return href ? (
            <Link key={label} to={href} className="block transition-opacity hover:opacity-90">{inner}</Link>
          ) : (
            <div key={label}>{inner}</div>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Recent Bookings */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                {['Name', 'Service', 'Date', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {[44, 28, 18, 14].map((w, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-3 animate-pulse rounded bg-gray-100" style={{ width: `${w}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : recentBookings.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400">No bookings yet.</td></tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-900">{b.fullName}</p>
                      <p className="text-xs text-gray-400">{b.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{SERVICE_LABELS[b.service] ?? b.service}</td>
                    <td className="px-5 py-3.5 text-gray-500">
                      {b.preferredDates[0] ? new Date(b.preferredDates[0]).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={STATUS_BADGE[b.status] ?? 'warning'}>
                        {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Inquiries */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-gray-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="ml-4 mt-1.5 h-2.5 w-3/4 animate-pulse rounded bg-gray-100" />
                </div>
              ))
            ) : recentInquiries.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-gray-400">No inquiries yet.</p>
            ) : (
              recentInquiries.map((inq) => (
                <Link key={inq.id} to="/admin/inquiries"
                  className="flex items-start gap-2 px-5 py-3.5 transition-colors hover:bg-gray-50"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!inq.isRead ? 'bg-primary-600' : 'bg-transparent'}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm ${!inq.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {inq.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">{inq.subject}</p>
                  </div>
                  <p className="ml-2 shrink-0 text-xs text-gray-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
