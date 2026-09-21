import { useState, useEffect } from 'react'
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import BookingDrawer from '@/components/admin/BookingDrawer'
import type { Booking, Status } from '@/types/booking'
import { SERVICE_LABELS } from '@/types/booking'
import api from '@/lib/api'

interface BookingsPage {
  bookings: Booking[]
  page: number
  limit: number
  total: number
  totalPages: number
}

const STATUS_VARIANT: Record<Status, 'warning' | 'success' | 'danger'> = {
  PENDING:   'warning',
  CONFIRMED: 'success',
  CANCELLED: 'danger',
  COMPLETED: 'success',
}

const PAGE_SIZE = 20

function exportCSV(rows: Booking[]) {
  const header = ['Name', 'Email', 'Phone', 'Service', 'Preferred Date', 'Status', 'Submitted', 'Admin Note']
  const body = rows.map((b) => [
    b.fullName, b.email, b.phone ?? '',
    SERVICE_LABELS[b.service] ?? b.service,
    b.preferredDates[0] ? new Date(b.preferredDates[0]).toLocaleString() : '',
    b.status,
    new Date(b.createdAt).toLocaleDateString(),
    b.adminNote ?? '',
  ])
  const csv = [header, ...body]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  Object.assign(document.createElement('a'), {
    href: url,
    download: `bookings-${new Date().toISOString().slice(0, 10)}.csv`,
  }).click()
  URL.revokeObjectURL(url)
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null)
  const [fetchKey, setFetchKey] = useState(0)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasFilters = !!(search || serviceFilter || statusFilter)

  useEffect(() => { setPage(1); setSelected(new Set()) }, [search, serviceFilter, statusFilter])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) })
    if (serviceFilter) params.set('service', serviceFilter)
    if (statusFilter) params.set('status', statusFilter)

    api
      .get<{ data: BookingsPage }>(`/bookings?${params}`)
      .then(({ data }) => {
        if (!cancelled) {
          const list = data.data?.bookings ?? []
          const filtered = search
            ? list.filter(
                (b) =>
                  b.fullName.toLowerCase().includes(search.toLowerCase()) ||
                  b.email.toLowerCase().includes(search.toLowerCase()),
              )
            : list
          setBookings(filtered)
          setTotal(data.data?.total ?? 0)
        }
      })
      .catch(() => { if (!cancelled) toast.error('Failed to load bookings.') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [page, search, serviceFilter, statusFilter, fetchKey])

  const refetch = () => setFetchKey((k) => k + 1)

  function toggleSelect(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function toggleAll() {
    setSelected(selected.size === bookings.length ? new Set() : new Set(bookings.map((b) => b.id)))
  }

  async function bulkUpdate(status: Status) {
    const ids = Array.from(selected)
    try {
      await Promise.all(ids.map((id) => api.patch(`/bookings/${id}/status`, { status })))
      toast.success(`${ids.length} booking${ids.length !== 1 ? 's' : ''} updated.`)
      setSelected(new Set())
      refetch()
    } catch {
      toast.error('Bulk update failed.')
    }
  }

  function handleSaved(updated: Booking) {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
    setActiveBooking(updated)
  }

  function handleDeleted(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id))
    setTotal((t) => t - 1)
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n })
  }

  const allSelected = bookings.length > 0 && selected.size === bookings.length
  const selectCls = 'h-4 w-4 rounded accent-[#6b21a8] cursor-pointer'

  return (
    <>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {loading ? 'Loading…' : `${total} booking${total !== 1 ? 's' : ''} total`}
            </p>
          </div>
          <button
            onClick={() => exportCSV(bookings)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <Download size={15} /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-52 flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          >
            <option value="">All services</option>
            <option value="COUNSELING">Individual Counseling</option>
            <option value="SOCIAL_CONSULTING">Social Consulting</option>
            <option value="STUDENT_VISA">Student Visa</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          >
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {hasFilters && (
            <button onClick={() => { setSearch(''); setServiceFilter(''); setStatusFilter('') }}
              className="px-2 text-sm text-gray-400 hover:text-gray-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3">
            <span className="text-sm font-medium text-primary-700">{selected.size} selected</span>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => bulkUpdate('CONFIRMED')}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">
                Confirm
              </button>
              <button onClick={() => bulkUpdate('PENDING')}
                className="rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-yellow-600">
                Mark Pending
              </button>
              <button onClick={() => bulkUpdate('CANCELLED')}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">
                Cancel
              </button>
              <button onClick={() => setSelected(new Set())} className="ml-1 text-sm text-gray-500 hover:text-gray-700">
                Deselect
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className={selectCls} />
                  </th>
                  {['Name / Email', 'Service', 'Preferred Date', 'Status', 'Submitted'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: 7 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4" />
                      {[55, 38, 28, 18, 22].map((w, j) => (
                        <td key={j} className="px-4 py-4">
                          <div className="h-3.5 animate-pulse rounded bg-gray-100" style={{ width: `${w}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : bookings.length === 0 ? (
                  <tr><td colSpan={6} className="py-14 text-center text-sm text-gray-400">
                    {hasFilters ? 'No bookings match the current filters.' : 'No bookings yet.'}
                  </td></tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} onClick={() => setActiveBooking(b)}
                      className={`cursor-pointer transition-colors hover:bg-gray-50 ${selected.has(b.id) ? 'bg-primary-50/40' : ''}`}
                    >
                      <td className="px-4 py-3.5" onClick={(e) => { e.stopPropagation(); toggleSelect(b.id) }}>
                        <input type="checkbox" checked={selected.has(b.id)} onChange={() => toggleSelect(b.id)}
                          onClick={(e) => e.stopPropagation()} className={selectCls} />
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-gray-900">{b.fullName}</p>
                        <p className="text-xs text-gray-400">{b.email}</p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{SERVICE_LABELS[b.service] ?? b.service}</td>
                      <td className="px-4 py-3.5 text-gray-600">
                        {b.preferredDates[0] ? new Date(b.preferredDates[0]).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={STATUS_VARIANT[b.status] ?? 'warning'}>
                          {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && total > PAGE_SIZE && (
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
              <p className="text-sm text-gray-400">
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30">
                  <ChevronLeft size={16} />
                </button>
                <span className="w-16 text-center text-sm text-gray-600">{page} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BookingDrawer
        booking={activeBooking}
        onClose={() => setActiveBooking(null)}
        onSaved={handleSaved}
        onDeleted={handleDeleted}
      />
    </>
  )
}
