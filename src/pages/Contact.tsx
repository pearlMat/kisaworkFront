import { useState, useRef, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import api from '@/lib/api'
import FileUpload from '@/components/ui/FileUpload'
import contactImg from '@/images/contact.jpeg'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const mountTime = useRef(Date.now())

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Honeypot or too-fast submission → silent fake success
    if (honeypot || Date.now() - mountTime.current < 2500) {
      toast.success(t('contact.toast.success'))
      setForm({ name: '', email: '', subject: '', message: '' })
      setFiles([])
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('subject', form.subject)
      fd.append('message', form.message)
      files.forEach((f) => fd.append('attachments', f))
      await api.post('/inquiries', fd)
      toast.success(t('contact.toast.success'))
      setForm({ name: '', email: '', subject: '', message: '' })
      setFiles([])
    } catch {
      toast.error(t('contact.toast.error'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={contactImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('contact.hero.title')}</h1>
          <p className="mt-4 text-lg text-primary-200/80">{t('contact.hero.sub')}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">{t('contact.form.heading')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={set('name')}
                    placeholder={t('contact.form.namePlaceholder')}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={set('subject')}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('contact.form.message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={inputCls}
                />
              </div>
              <FileUpload
                files={files}
                onChange={setFiles}
                label={t('contact.form.attachments')}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
              >
                {loading ? t('contact.form.sending') : t('contact.form.send')}
              </button>
            </form>
          </div>

          {/* Contact details */}
          <div className="space-y-8 pt-2">
            <h2 className="text-xl font-bold text-gray-900">{t('contact.info.heading')}</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Mail size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('contact.info.email')}</p>
                  <p className="text-sm text-gray-500">info@kisaworksolutions.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Phone size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('contact.info.phone')}</p>
                  <p className="text-sm text-gray-500">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <Clock size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('contact.info.hours')}</p>
                  <p className="text-sm text-gray-500">{t('contact.info.hoursValue')}</p>
                </div>
              </div>
            </div>

            <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-sm text-gray-400">
              {t('contact.info.mapPlaceholder')}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
