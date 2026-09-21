import { Link } from 'react-router-dom'
import { ClipboardList, UserCheck, MapPin, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import howItWorksImg from '@/images/how-it-works.jpeg'

export default function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    { icon: ClipboardList, number: '01', title: t('hiw.steps.s1.title'), description: t('hiw.steps.s1.desc') },
    { icon: UserCheck,     number: '02', title: t('hiw.steps.s2.title'), description: t('hiw.steps.s2.desc') },
    { icon: MapPin,        number: '03', title: t('hiw.steps.s3.title'), description: t('hiw.steps.s3.desc') },
  ]

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={howItWorksImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('hiw.hero.title')}</h1>
          <p className="mt-4 text-lg text-primary-200/80">{t('hiw.hero.sub')}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {steps.map(({ icon: Icon, number, title, description }) => (
            <div key={number} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                  <Icon size={20} />
                </div>
                <div className="mt-2 w-px flex-1 bg-gray-200" />
              </div>
              <div className="pb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-primary-600">{number}</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">{title}</h2>
                <p className="mt-2 leading-relaxed text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('hiw.cta.heading')}</h2>
        <p className="mt-3 text-gray-500">{t('hiw.cta.sub')}</p>
        <Link
          to="/book"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-700 to-primary-600 px-7 py-3 text-sm font-bold text-white shadow-sm hover:from-primary-800 hover:to-primary-700"
        >
          {t('hiw.cta.btn')} <ArrowRight size={14} />
        </Link>
      </section>
    </>
  )
}
