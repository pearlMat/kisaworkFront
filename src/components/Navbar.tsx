import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const isDE = i18n.language.startsWith('de')
  const toggleLang = () => i18n.changeLanguage(isDE ? 'en' : 'de')

  const navLinks = [
    { to: '/services',   label: t('nav.services')   },
    { to: '/about',      label: t('nav.about')      },
    { to: '/how-it-works', label: t('nav.howItWorks') },
    { to: '/contact',    label: t('nav.contact')    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="bg-gradient-to-r from-primary-900 to-primary-600 bg-clip-text text-xl font-bold text-transparent"
        >
          KISA Work Solutions
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
            aria-label="Switch language"
          >
            {isDE ? 'EN' : 'DE'}
          </button>

          {/* Book CTA */}
          <Link
            to="/book"
            className="hidden rounded-full bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-primary-800 hover:to-primary-700 md:block"
          >
            {t('nav.bookCta')}
          </Link>

          {/* Hamburger */}
          <button
            className="p-1.5 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-0.5 pt-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-primary-700 to-primary-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t('nav.bookCta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
