import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

interface SiteInfo {
  businessName: string
  tagline: string
  contactEmail: string
  phone: string
  address: string
}

interface Notifications {
  newBookingAlert: boolean
  bookingConfirmation: boolean
  bookingCancellation: boolean
  newInquiryAlert: boolean
  inquiryAutoReply: boolean
}

interface Settings {
  site: SiteInfo
  notifications: Notifications
}

const SITE_DEFAULT: SiteInfo = {
  businessName: 'KISA Work Solutions',
  tagline: 'Expert consulting for individuals and international students.',
  contactEmail: '',
  phone: '',
  address: '',
}

const NOTIF_DEFAULT: Notifications = {
  newBookingAlert: true,
  bookingConfirmation: true,
  bookingCancellation: true,
  newInquiryAlert: true,
  inquiryAutoReply: false,
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${
        checked ? 'bg-primary-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function NotifRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function Field({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  textarea?: boolean
}) {
  const cls =
    'block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  )
}

function CardShell({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">{footer}</div>
    </div>
  )
}

export default function Settings() {
  const [loadingInit, setLoadingInit] = useState(true)
  const [site, setSite] = useState<SiteInfo>(SITE_DEFAULT)
  const [notifs, setNotifs] = useState<Notifications>(NOTIF_DEFAULT)
  const [savingSite, setSavingSite] = useState(false)
  const [savingNotifs, setSavingNotifs] = useState(false)

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [savingPw, setSavingPw] = useState(false)

  useEffect(() => {
    api
      .get<{ data: Settings }>('/admin/settings')
      .then(({ data }) => {
        if (data.data?.site) setSite(data.data.site)
        if (data.data?.notifications) setNotifs(data.data.notifications)
      })
      .catch(() => {})
      .finally(() => setLoadingInit(false))
  }, [])

  async function saveSite(e: React.FormEvent) {
    e.preventDefault()
    setSavingSite(true)
    try {
      await api.put('/admin/settings', { site })
      toast.success('Site information saved.')
    } catch {
      toast.error('Failed to save site information.')
    } finally {
      setSavingSite(false)
    }
  }

  async function saveNotifs() {
    setSavingNotifs(true)
    try {
      await api.put('/admin/settings', { notifications: notifs })
      toast.success('Notification preferences saved.')
    } catch {
      toast.error('Failed to save preferences.')
    } finally {
      setSavingNotifs(false)
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    if (pw.next !== pw.confirm) {
      toast.error('New passwords do not match.')
      return
    }
    if (pw.next.length < 8) {
      toast.error('New password must be at least 8 characters.')
      return
    }
    setSavingPw(true)
    try {
      await api.put('/admin/password', {
        currentPassword: pw.current,
        newPassword: pw.next,
      })
      toast.success('Password updated.')
      setPw({ current: '', next: '', confirm: '' })
    } catch {
      toast.error('Failed to update password. Check your current password.')
    } finally {
      setSavingPw(false)
    }
  }

  function setNotif<K extends keyof Notifications>(key: K, value: Notifications[K]) {
    setNotifs((prev) => ({ ...prev, [key]: value }))
  }

  const saveBtn = (loading: boolean, label = 'Save Changes') => (
    <button
      type="submit"
      disabled={loading || loadingInit}
      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
    >
      {loading ? 'Saving…' : label}
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Manage site information, notifications, and your admin account.
        </p>
      </div>

      {/* Site Information */}
      <form onSubmit={saveSite}>
        <CardShell
          title="Site Information"
          description="Public-facing details shown across the website and in contact pages."
          footer={saveBtn(savingSite)}
        >
          {loadingInit ? (
            <div className="space-y-4">
              {[60, 80, 48, 36, 72].map((w, i) => (
                <div key={i}>
                  <div className="mb-1.5 h-3.5 w-24 animate-pulse rounded bg-gray-100" />
                  <div
                    className="h-10 animate-pulse rounded-lg bg-gray-100"
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Business Name"
                id="businessName"
                value={site.businessName}
                onChange={(v) => setSite((s) => ({ ...s, businessName: v }))}
                placeholder="KISA Work Solutions"
              />
              <Field
                label="Contact Email"
                id="contactEmail"
                type="email"
                value={site.contactEmail}
                onChange={(v) => setSite((s) => ({ ...s, contactEmail: v }))}
                placeholder="hello@kisaworksolutions.com"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Tagline"
                  id="tagline"
                  value={site.tagline}
                  onChange={(v) => setSite((s) => ({ ...s, tagline: v }))}
                  placeholder="Expert consulting for individuals and international students."
                />
              </div>
              <Field
                label="Phone"
                id="phone"
                type="tel"
                value={site.phone}
                onChange={(v) => setSite((s) => ({ ...s, phone: v }))}
                placeholder="+44 20 0000 0000"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  id="address"
                  value={site.address}
                  onChange={(v) => setSite((s) => ({ ...s, address: v }))}
                  placeholder="123 Business Street, London, UK"
                  textarea
                />
              </div>
            </div>
          )}
        </CardShell>
      </form>

      {/* Email Notifications */}
      <CardShell
        title="Email Notifications"
        description="Control which automated emails are sent to clients and to you."
        footer={
          <button
            type="button"
            onClick={saveNotifs}
            disabled={savingNotifs || loadingInit}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {savingNotifs ? 'Saving…' : 'Save Changes'}
          </button>
        }
      >
        {loadingInit ? (
          <div className="space-y-0 divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4">
                <div className="space-y-1.5">
                  <div className="h-3.5 w-44 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-64 animate-pulse rounded bg-gray-100" />
                </div>
                <div className="h-6 w-11 animate-pulse rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            <NotifRow
              label="New booking alert"
              description="Notify you by email whenever a new booking is submitted."
              checked={notifs.newBookingAlert}
              onChange={(v) => setNotif('newBookingAlert', v)}
            />
            <NotifRow
              label="Booking confirmation to client"
              description="Send a confirmation email to the client when you confirm their booking."
              checked={notifs.bookingConfirmation}
              onChange={(v) => setNotif('bookingConfirmation', v)}
            />
            <NotifRow
              label="Booking cancellation to client"
              description="Send a notification to the client when their booking is cancelled."
              checked={notifs.bookingCancellation}
              onChange={(v) => setNotif('bookingCancellation', v)}
            />
            <NotifRow
              label="New inquiry alert"
              description="Notify you by email whenever a new contact inquiry is received."
              checked={notifs.newInquiryAlert}
              onChange={(v) => setNotif('newInquiryAlert', v)}
            />
            <NotifRow
              label="Auto-reply to inquiries"
              description="Automatically send a receipt email to clients when they submit an inquiry."
              checked={notifs.inquiryAutoReply}
              onChange={(v) => setNotif('inquiryAutoReply', v)}
            />
          </div>
        )}
      </CardShell>

      {/* Change Password */}
      <form onSubmit={changePassword}>
        <CardShell
          title="Change Password"
          description="Update the password used to log in to the admin panel."
          footer={saveBtn(savingPw, 'Update Password')}
        >
          <div className="grid gap-4 sm:max-w-md">
            <Field
              label="Current Password"
              id="currentPw"
              type="password"
              value={pw.current}
              onChange={(v) => setPw((p) => ({ ...p, current: v }))}
            />
            <Field
              label="New Password"
              id="newPw"
              type="password"
              value={pw.next}
              onChange={(v) => setPw((p) => ({ ...p, next: v }))}
              placeholder="At least 8 characters"
            />
            <Field
              label="Confirm New Password"
              id="confirmPw"
              type="password"
              value={pw.confirm}
              onChange={(v) => setPw((p) => ({ ...p, confirm: v }))}
            />
          </div>
        </CardShell>
      </form>
    </div>
  )
}
