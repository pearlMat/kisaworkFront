import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import individualImg from '@/images/individual.jpeg'
import counsellingContentImg from '@/images/counselling-content.jpeg'

export default function Counseling() {
  const { t } = useTranslation()

  const items = [
    t('counseling.items.i1'),
    t('counseling.items.i2'),
    t('counseling.items.i3'),
    t('counseling.items.i4'),
  ]

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={individualImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-300/80">
            {t('counseling.label')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{t('counseling.title')}</h1>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div>
              <p className="text-lg leading-relaxed text-gray-600">{t('counseling.p1')}</p>
              <p className="mt-4 leading-relaxed text-gray-500">{t('counseling.p2')}</p>

              <div className="mt-10 rounded-xl bg-primary-50 p-6">
                <h2 className="font-bold text-gray-900">{t('counseling.included')}</h2>
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
                  {t('counseling.book')}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-600"
                >
                  <ArrowRight size={14} className="rotate-180" /> {t('counseling.back')}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={counsellingContentImg}
                alt="Individual counseling session"
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
