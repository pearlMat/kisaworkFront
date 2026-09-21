import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { X, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Booking, Status } from '@/types/booking'
import { SERVICE_LABELS } from '@/types/booking'
import api from '@/lib/api'

const STATUS_OPTIONS: { value: Status; label: string; activeClass: string }[] = [
  { value: 'PENDING',   label: 'Pending',   activeClass: 'border-yellow-400 bg-yellow-50 text-yellow-700' },
  { value: 'CONFIRMED', label: 'Confirmed', activeClass: 'border-green-400  bg-green-50  text-green-700'  },
  { value: 'CANCELLED', label: 'Cancelled', activeClass: 'border-red-400    bg-red-50    text-red-700'    },
  { value: 'COMPLETED', label: 'Completed', activeClass: 'border-blue-400   bg-blue-50   text-blue-700'   },
]

interface Props {
  booking: Booking | null
  onClose: () => void
  onSaved: (updated: Booking) => void
  onDeleted: (id: string) => void
}

export default function BookingDrawer({ booking, onClose, onSaved, onDeleted }: Props) {
  const [status, setStatus] = useState<Status>('PENDING')
  const [adminNote, setAdminNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const open = !!booking

  useEffect(() => {
    if (booking) {
      setStatus(booking.status)
      setAdminNote(booking.adminNote ?? '')
      setConfirmDelete(false)
    }
  }, [booking])

  async function save() {
    if (!booking) return
    setSaving(true)
    try {
      const { data } = await api.patch<{ data: Booking }>(`/bookings/${booking.id}/status`, { status, adminNote })
      onSaved(data.data)
      toast.success('Booking updated.')
    } catch {
      toast.error('Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!booking) return
    setDeleting(true)
    try {
      await api.delete(`/bookings/${booking.id}`)
      onDeleted(booking.id)
      toast.success('Booking deleted.')
      onClose()
    } catch {
      toast.error('Failed to delete booking.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Booking Details</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {booking && (
            <div className="divide-y divide-gray-50 px-5">
              <section className="py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
                <dl className="space-y-2.5 text-sm">
                  <Row label="Name" value={booking.fullName} />
                  <Row label="Email">
                    <a href={`mailto:${booking.email}`} className="font-medium text-primary-600 hover:underline">{booking.email}</a>
                  </Row>
                  {booking.phone && <Row label="Phone" value={booking.phone} />}
                </dl>
              </section>

              <section className="py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Booking</p>
                <dl className="space-y-2.5 text-sm">
                  <Row label="Service" value={SERVICE_LABELS[booking.service] ?? booking.service} />
                  <Row label="Preferred Date"
                    value={booking.preferredDates[0] ? new Date(booking.preferredDates[0]).toLocaleString() : '—'} />
                  <Row label="Submitted" value={new Date(booking.createdAt).toLocaleDateString()} />
                </dl>
                {booking.message && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="mb-1 text-xs font-medium text-gray-400">Client notes</p>
                    <p className="text-sm text-gray-600">{booking.message}</p>
                  </div>
                )}
              </section>

              <section className="py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((opt) => (
                    <button key={opt.value} onClick={() => setStatus(opt.value)}
                      className={`rounded-lg border-2 py-2 text-sm font-semibold transition-colors ${
                        status === opt.value
                          ? opt.activeClass
                          : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="py-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Admin Note</p>
                <textarea rows={4} value={adminNote} onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add an internal note…"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </section>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          {confirmDelete ? (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
              <p className="flex-1 text-sm text-red-700">Delete this booking permanently?</p>
              <button onClick={() => setConfirmDelete(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={remove} disabled={deleting}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60">
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                <Trash2 size={14} /> Delete
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-gray-900">{children ?? value}</dd>
    </div>
  )
}
