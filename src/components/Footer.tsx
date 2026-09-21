import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const serviceLinks = [
    { to: '/services/counseling',       label: t('footer.links.counseling') },
    { to: '/services/social-consulting', label: t('footer.links.social')     },
    { to: '/services/student-visa',     label: t('footer.links.visa')        },
  ]

  const companyLinks = [
    { to: '/about',         label: t('footer.links.about')   },
    { to: '/how-it-works',  label: t('footer.links.hiw')     },
    { to: '/contact',       label: t('footer.links.contact') },
    { to: '/book',          label: t('footer.links.book')    },
  ]

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top accent */}
      <div className="h-0.5 bg-gradient-to-r from-primary-800 via-primary-600 to-primary-400" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-lg font-bold text-transparent">
              KISA Work Solutions
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {t('footer.services')}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {t('footer.company')}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <a
                href="mailto:info@kisaworksolutions.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <Mail size={14} className="shrink-0 text-primary-500" />
                info@kisaworksolutions.com
              </a>
              <a
                href="tel:+15550000000"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <Phone size={14} className="shrink-0 text-primary-500" />
                +1 (555) 000-0000
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800/60 pt-8 text-center text-xs text-gray-600">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}
