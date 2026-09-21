import { useState, useRef, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import api from '@/lib/api'
import FileUpload from '@/components/ui/FileUpload'
import bookImg from '@/images/book.jpeg'

interface BookingForm {
  service: string
  preferredDate: string
  fullName: string
  email: string
  phone: string
  message: string
}

export default function Book() {
  const { t } = useTranslation()
  const [form, setForm] = useState<BookingForm>({
    service: '',
    preferredDate: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<BookingForm>>({})
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const mountTime = useRef(Date.now())

  const set =
    (field: keyof BookingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      setErrors((err) => ({ ...err, [field]: undefined }))
    }

  function validate() {
    const e: Partial<BookingForm> = {}
    if (!form.service) e.service = t('book.errors.service')
    if (!form.preferredDate) e.preferredDate = t('book.errors.date')
    if (!form.fullName.trim()) e.fullName = t('book.errors.name')
    if (!form.email.trim()) e.email = t('book.errors.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('book.errors.emailInvalid')
    return e
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Honeypot or too-fast submission → silent fake success
    if (honeypot || Date.now() - mountTime.current < 2500) {
      toast.success(t('book.toast.success'))
      setForm({ service: '', preferredDate: '', fullName: '', email: '', phone: '', message: '' })
      setFiles([])
      return
    }
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('service', form.service)
      fd.append('fullName', form.fullName)
      fd.append('email', form.email)
      if (form.phone) fd.append('phone', form.phone)
      fd.append('preferredDates', form.preferredDate)
      if (form.message) fd.append('message', form.message)
      files.forEach((f) => fd.append('attachments', f))
      await api.post('/bookings', fd)
      toast.success(t('book.toast.success'))
      setForm({ service: '', preferredDate: '', fullName: '', email: '', phone: '', message: '' })
      setFiles([])
    } catch {
      toast.error(t('book.toast.error'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (err?: string) =>
    `block w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ${
      err
        ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
        : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600'
    }`

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={bookImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('book.hero.title')}</h1>
          <p className="mt-4 text-lg text-primary-200/80">{t('book.hero.sub')}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot — hidden from humans, bots fill it in */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {/* Service */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('book.fields.serviceRequired')}
              </label>
              <select
                value={form.service}
                onChange={set('service')}
                className={inputCls(errors.service)}
              >
                <option value="">{t('book.fields.servicePlaceholder')}</option>
                <option value="COUNSELING">{t('book.options.counseling')}</option>
                <option value="SOCIAL_CONSULTING">{t('book.options.social')}</option>
                <option value="STUDENT_VISA">{t('book.options.visa')}</option>
              </select>
              {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
            </div>

            {/* Preferred date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('book.fields.date')}
              </label>
              <input
                type="datetime-local"
                value={form.preferredDate}
                onChange={set('preferredDate')}
                className={inputCls(errors.preferredDate)}
              />
              {errors.preferredDate && (
                <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>
              )}
            </div>

            {/* Name + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('book.fields.name')}
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={set('fullName')}
                  placeholder={t('book.fields.namePlaceholder')}
                  className={inputCls(errors.fullName)}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('book.fields.email')}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder={t('book.fields.emailPlaceholder')}
                  className={inputCls(errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('book.fields.phone')}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder={t('book.fields.phonePlaceholder')}
                className={inputCls()}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t('book.fields.notes')}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={set('message')}
                placeholder={t('book.fields.notesPlaceholder')}
                className={inputCls()}
              />
            </div>

            {/* Attachments */}
            <FileUpload
              files={files}
              onChange={setFiles}
              label={t('book.fields.attachments')}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
            >
              {loading ? t('book.submitting') : t('book.submit')}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
