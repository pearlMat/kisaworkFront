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
              <a
                href="https://wa.me/491631517208"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="shrink-0 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
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
