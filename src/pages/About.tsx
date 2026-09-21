import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import aboutImg from '@/images/about.jpeg'

export default function About() {
  const { t } = useTranslation()

  const values = [
    { key: 'empathy',      title: t('about.values.empathy.title'),      desc: t('about.values.empathy.desc') },
    { key: 'integrity',    title: t('about.values.integrity.title'),    desc: t('about.values.integrity.desc') },
    { key: 'excellence',   title: t('about.values.excellence.title'),   desc: t('about.values.excellence.desc') },
    { key: 'accessibility',title: t('about.values.accessibility.title'),desc: t('about.values.accessibility.desc') },
  ]

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={aboutImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('about.hero.title')}</h1>
          <p className="mt-4 text-lg text-primary-200/80">{t('about.hero.sub')}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('about.mission.heading')}</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{t('about.mission.body')}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={aboutImg}
                alt="KISA Work Solutions team"
                className="h-full w-full object-cover"
                style={{ maxHeight: '420px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2e1065]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
            {t('about.values.heading')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ key, title, desc }) => (
              <div key={key} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-primary-600">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
            {t('about.team.heading')}
          </h2>
          <p className="mb-10 text-center text-gray-500">{t('about.team.sub')}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex flex-col items-center rounded-xl border border-dashed border-gray-200 p-8 text-center"
              >
                <div className="mb-4 h-20 w-20 rounded-full bg-gray-100" />
                <div className="h-4 w-32 rounded bg-gray-100" />
                <div className="mt-2 h-3 w-24 rounded bg-gray-50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center text-white sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #6b21a8 100%)' }}>
        <h2 className="text-2xl font-bold tracking-tight">{t('about.cta.heading')}</h2>
        <p className="mt-3 text-primary-200/80">{t('about.cta.sub')}</p>
        <Link
          to="/book"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-primary-800 hover:bg-primary-50"
        >
          {t('about.cta.btn')} <ArrowRight size={14} />
        </Link>
      </section>
    </>
  )
}
