import { Link } from 'react-router-dom'
import { Users, Globe, GraduationCap, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import servicesImg from '@/images/services.jpeg'
import individualImg from '@/images/individual.jpeg'
import socialImg from '@/images/social.jpeg'
import studentImg from '@/images/student.jpeg'

export default function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Users,
      title: t('services.counseling.title'),
      description: t('services.counseling.desc'),
      href: '/services/counseling',
      img: individualImg,
    },
    {
      icon: Globe,
      title: t('services.social.title'),
      description: t('services.social.desc'),
      href: '/services/social-consulting',
      img: socialImg,
    },
    {
      icon: GraduationCap,
      title: t('services.visa.title'),
      description: t('services.visa.desc'),
      href: '/services/student-visa',
      img: studentImg,
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <img src={servicesImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2e1065d9 0%, #3b0764d9 50%, #6b21a8d9 100%)' }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('services.hero.title')}</h1>
          <p className="mt-4 text-lg text-primary-200/80">{t('services.hero.sub')}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description, href, img }) => (
              <Link
                key={href}
                to={href}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex rounded-xl bg-white/90 p-2.5 backdrop-blur-sm">
                    <Icon size={20} className="text-primary-700" />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-900">{title}</h2>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all group-hover:gap-3">
                    {t('services.learnMore')} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
