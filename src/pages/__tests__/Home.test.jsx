import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../Home'

test('muestra encabezado y tarjetas principales', () => {
  render(<MemoryRouter><Home /></MemoryRouter>)
  expect(screen.getByText('Productos Estrella')).toBeInTheDocument()
  expect(screen.getAllByText('¡Más productos!').length).toBeGreaterThanOrEqual(3)
  expect(screen.getByAltText('Pantuflas')).toBeInTheDocument()
  expect(screen.getByAltText('Chapas')).toBeInTheDocument()
  expect(screen.getByAltText('Kit Anti Resaca')).toBeInTheDocument()
})
