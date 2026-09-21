import { useState, useEffect } from 'react'
import { Mail, Trash2, Reply } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Inquiry, InquiryStatus } from '@/types/inquiry'
import api from '@/lib/api'

type Filter = 'all' | 'NEW' | 'IN_PROGRESS' | 'RESOLVED'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',         label: 'All' },
  { value: 'NEW',         label: 'New' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED',    label: 'Resolved' },
]

const STATUS_LABELS: Record<InquiryStatus, string> = {
  NEW:         'New',
  IN_PROGRESS: 'In Progress',
  RESOLVED:    'Resolved',
  CLOSED:      'Closed',
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const activeInquiry = inquiries.find((i) => i.id === activeId) ?? null
  const unreadCount = inquiries.filter((i) => !i.isRead).length

  useEffect(() => { setActiveId(null) }, [filter])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)

    api
      .get<{ data: { inquiries: Inquiry[]; total: number } }>(`/inquiries?${params}`)
      .then(({ data }) => {
        if (!cancelled) {
          setInquiries(data.data?.inquiries ?? [])
          setTotal(data.data?.total ?? 0)
        }
      })
      .catch(() => { if (!cancelled) toast.error('Failed to load inquiries.') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [filter])

  async function selectInquiry(inq: Inquiry) {
    setActiveId(inq.id)
    setConfirmDelete(false)

    if (!inq.isRead) {
      try {
        await api.patch(`/inquiries/${inq.id}/read`)
        setInquiries((prev) => prev.map((i) => (i.id === inq.id ? { ...i, isRead: true } : i)))
      } catch {
        // non-critical
      }
    }
  }

  async function updateStatus(newStatus: InquiryStatus) {
    if (!activeInquiry) return
    setUpdatingStatus(true)
    try {
      const { data } = await api.patch<{ data: Inquiry }>(`/inquiries/${activeInquiry.id}/status`, { status: newStatus })
      setInquiries((prev) => prev.map((i) => (i.id === data.data.id ? data.data : i)))
      toast.success('Status updated.')
    } catch {
      toast.error('Failed to update status.')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function deleteInquiry() {
    if (!activeInquiry) return
    setDeleting(true)
    try {
      await api.delete(`/inquiries/${activeInquiry.id}`)
      setInquiries((prev) => prev.filter((i) => i.id !== activeInquiry.id))
      setTotal((t) => t - 1)
      setActiveId(null)
      toast.success('Inquiry deleted.')
    } catch {
      toast.error('Failed to delete inquiry.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          {loading
            ? 'Loading…'
            : `${total} ${total !== 1 ? 'inquiries' : 'inquiry'}${
                filter === 'all' && unreadCount > 0 ? ` · ${unreadCount} unread` : ''
              }`}
        </p>
      </div>

      {/* Split panel */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Left: list */}
        <div className="flex w-80 shrink-0 flex-col border-r border-gray-100">
          {/* Filter tabs */}
          <div className="flex gap-1 border-b border-gray-100 px-3 py-2">
            {FILTERS.map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Inquiry list */}
          <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-gray-100" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-100" />
                  <div className="mt-1.5 h-2.5 w-1/3 animate-pulse rounded bg-gray-100" />
                </div>
              ))
            ) : inquiries.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-gray-400">No inquiries found.</p>
            ) : (
              inquiries.map((inq) => (
                <button key={inq.id} onClick={() => selectInquiry(inq)}
                  className={`w-full px-4 py-3.5 text-left transition-colors ${
                    activeId === inq.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!inq.isRead ? 'bg-primary-600' : 'bg-transparent'}`} />
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${!inq.isRead ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
                        {inq.name}
                      </p>
                      <p className={`truncate text-sm ${!inq.isRead ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                        {inq.subject}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: detail */}
        <div className="flex min-w-0 flex-1 flex-col">
          {!activeInquiry ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Mail className="mx-auto mb-3 h-10 w-10 text-gray-200" />
                <p className="text-sm text-gray-400">Select an inquiry to view</p>
              </div>
            </div>
          ) : (
            <>
              {/* Detail header */}
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-gray-900">{activeInquiry.subject}</h2>
                    <p className="mt-0.5 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{activeInquiry.name}</span>
                      {' · '}
                      <a href={`mailto:${activeInquiry.email}`} className="text-primary-600 hover:underline">
                        {activeInquiry.email}
                      </a>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {new Date(activeInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <a href={`mailto:${activeInquiry.email}?subject=Re: ${encodeURIComponent(activeInquiry.subject)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary-200 px-3 py-1.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
                  >
                    <Reply size={14} /> Reply
                  </a>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="mb-6 rounded-xl bg-gray-50 px-5 py-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                    {activeInquiry.message}
                  </p>
                </div>

                {/* Status update */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STATUS_LABELS) as InquiryStatus[]).map((s) => (
                      <button key={s} onClick={() => updateStatus(s)} disabled={updatingStatus}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-60 ${
                          activeInquiry.status === s
                            ? 'bg-primary-600 text-white'
                            : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-6 py-4">
                {confirmDelete ? (
                  <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
                    <p className="flex-1 text-sm text-red-700">Delete this inquiry permanently?</p>
                    <button onClick={() => setConfirmDelete(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                    <button onClick={deleteInquiry} disabled={deleting}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700">
                      {deleting ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete inquiry
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
