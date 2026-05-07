import React from 'react'
import { render, screen } from '@testing-library/react'
import About from '../About'

test('renderiza contenido básico de About', () => {
  render(<About />)
  expect(screen.getByText('fff')).toBeInTheDocument()
})
