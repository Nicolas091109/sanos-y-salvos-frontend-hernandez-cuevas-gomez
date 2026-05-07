import React from 'react'
import { render, screen } from '@testing-library/react'
import Nosotros from '../Nosotros'

test('renderiza sección Nosotros y testimonios', () => {
  render(<Nosotros />)
  expect(screen.getByText('Nosotros')).toBeInTheDocument()
  expect(screen.getByText('Testimonios')).toBeInTheDocument()
  expect(screen.getByAltText('Matrimonios.cl')).toBeInTheDocument()
  expect(screen.getByText(/Hilda Pavez Acevedo/)).toBeInTheDocument()
})
