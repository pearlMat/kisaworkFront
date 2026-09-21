import { Link } from 'react-router-dom'
import { ArrowRight, Users, Globe, GraduationCap, CheckCircle2, ShieldCheck, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import heroImg from '@/images/hero.jpeg'
import individualImg from '@/images/individual.jpeg'
import socialImg from '@/images/social.jpeg'
import studentImg from '@/images/student.jpeg'
import howItWorksImg from '@/images/how-it-works.jpeg'

export default function Home() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Users,
      title: t('home.services.counseling.title'),
      description: t('home.services.counseling.desc'),
      href: '/services/counseling',
      img: individualImg,
    },
    {
      icon: Globe,
      title: t('home.services.social.title'),
      description: t('home.services.social.desc'),
      href: '/services/social-consulting',
      img: socialImg,
    },
    {
      icon: GraduationCap,
      title: t('home.services.visa.title'),
      description: t('home.services.visa.desc'),
      href: '/services/student-visa',
      img: studentImg,
    },
  ]

  const steps = [
    { step: '01', title: t('home.howSteps.s1.title'), description: t('home.howSteps.s1.desc') },
    { step: '02', title: t('home.howSteps.s2.title'), description: t('home.howSteps.s2.desc') },
    { step: '03', title: t('home.howSteps.s3.title'), description: t('home.howSteps.s3.desc') },
  ]

  const trust = [
    { icon: ShieldCheck, label: 'Trusted Expertise', desc: 'Qualified consultants committed to your success' },
    { icon: Globe,       label: 'Multilingual Support', desc: 'Guidance available in English and German' },
    { icon: Star,        label: 'Personalised Approach', desc: 'Tailored one-on-one support for every client' },
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-0"
        style={{ background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 45%, #6b21a8 100%)' }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Text */}
          <div className="py-8 lg:py-28">
            <span className="mb-6 inline-block rounded-full border border-primary-400/30 bg-primary-800/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-300">
              Professional Consulting Services
            </span>
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              {t('home.hero.title1')}{' '}
              <span className="text-primary-300">{t('home.hero.title2')}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-100/80">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary-800 shadow-xl transition hover:bg-primary-50"
              >
                {t('home.hero.bookCta')} <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {t('home.hero.servicesCta')}
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden lg:flex lg:items-end lg:justify-end">
            <div className="relative h-[520px] w-full max-w-lg overflow-hidden rounded-tl-3xl rounded-tr-3xl">
              <img
                src={heroImg}
                alt="Professional consulting session"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e1065]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {trust.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                <Icon size={18} className="text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="mt-0.5 text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('home.offer.heading')}</h2>
            <p className="mt-3 text-gray-500">{t('home.offer.sub')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map(({ icon: Icon, title, description, href, img }) => (
              <Link
                key={href}
                to={href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary-100"
              >
                {/* Card image */}
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
                {/* Card body */}
                <div className="p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5">
                    {t('home.offer.learnMore')} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={howItWorksImg}
                alt="How our consulting process works"
                className="h-full w-full object-cover"
                style={{ maxHeight: '480px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2e1065]/40 to-transparent" />
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('home.steps.heading')}</h2>
              <p className="mt-3 text-gray-500">{t('home.steps.sub')}</p>

              <div className="mt-10 space-y-8">
                {steps.map(({ step, title, description }) => (
                  <div key={step} className="flex items-start gap-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-md"
                      style={{ background: 'linear-gradient(135deg, #581c87, #6b21a8)' }}
                    >
                      {step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  {t('home.steps.seeAll')} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #6b21a8 100%)' }}
        >
          <div className="px-8 py-16 text-center text-white sm:px-12">
            <CheckCircle2 size={44} className="mx-auto mb-5 text-primary-300 opacity-75" />
            <h2 className="text-3xl font-bold tracking-tight">{t('home.cta.heading')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-100/80">{t('home.cta.sub')}</p>
            <Link
              to="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary-800 shadow-lg transition hover:bg-primary-50"
            >
              {t('home.cta.btn')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
