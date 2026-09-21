import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #6b21a8 100%)' }}
    >
      <p className="text-8xl font-black tracking-tight text-white/10">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-white/50">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <ArrowLeft size={15} />
        Back to home
      </Link>
    </div>
  )
}
