import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import studentImg from '@/images/student.jpeg'
import studentContentImg from '@/images/student-content.jpeg'

export default function StudentVisa() {
  const { t } = useTranslation()

  const items = [
    t('visa.items.i1'),
    t('visa.items.i2'),
    t('visa.items.i3'),
    t('visa.items.i4'),
  ]

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={studentImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-300/80">
            {t('visa.label')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{t('visa.title')}</h1>
        </div>
      </section>

      {/* Legal disclaimer — required */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-start gap-3">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{t('visa.disclaimer.prefix')}</span>
            {t('visa.disclaimer.body')}
          </p>
        </div>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div>
              <p className="text-lg leading-relaxed text-gray-600">{t('visa.p1')}</p>
              <p className="mt-4 leading-relaxed text-gray-500">{t('visa.p2')}</p>

              <div className="mt-10 rounded-xl bg-primary-50 p-6">
                <h2 className="font-bold text-gray-900">{t('visa.helpWith')}</h2>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex gap-4">
                <Link
                  to="/book"
                  className="rounded-full bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-primary-800 hover:to-primary-700"
                >
                  {t('visa.book')}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-600"
                >
                  <ArrowRight size={14} className="rotate-180" /> {t('visa.back')}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={studentContentImg}
                alt="Student visa consulting"
                className="h-full w-full object-cover"
                style={{ maxHeight: '460px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2e1065]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
