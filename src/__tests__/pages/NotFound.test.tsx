import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '@/pages/NotFound'

const renderNotFound = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

describe('NotFound page', () => {
  it('displays the 404 watermark', () => {
    renderNotFound()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('displays a page not found heading', () => {
    renderNotFound()
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })

  it('has a link back to home', () => {
    renderNotFound()
    const link = screen.getByRole('link', { name: /back to home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
