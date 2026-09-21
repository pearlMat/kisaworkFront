import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Layout from '@/layouts/Layout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/components/ProtectedRoute'

// Public pages
import Home from '@/pages/Home'
import About from '@/pages/About'
import HowItWorks from '@/pages/HowItWorks'
import Book from '@/pages/Book'
import Contact from '@/pages/Contact'
import Services from '@/pages/services/Services'
import Counseling from '@/pages/services/Counseling'
import SocialConsulting from '@/pages/services/SocialConsulting'
import StudentVisa from '@/pages/services/StudentVisa'

// Fallback
import NotFound from '@/pages/NotFound'

// Admin pages
import AdminLogin from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import Bookings from '@/pages/admin/Bookings'
import Inquiries from '@/pages/admin/Inquiries'
import Content from '@/pages/admin/Content'
import Settings from '@/pages/admin/Settings'

export default function App() {
  return (
    <GluestackUIProvider mode="light">
    <BrowserRouter>
      <Routes>
        {/* Public routes wrapped in site layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/counseling" element={<Counseling />} />
          <Route path="/services/social-consulting" element={<SocialConsulting />} />
          <Route path="/services/student-visa" element={<StudentVisa />} />
        </Route>

        {/* Admin login — no layout wrapper */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<Bookings />} />
            <Route path="/admin/inquiries" element={<Inquiries />} />
            <Route path="/admin/content" element={<Content />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </GluestackUIProvider>
  )
}
