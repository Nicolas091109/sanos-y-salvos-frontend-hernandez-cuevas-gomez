import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

jest.mock('../../context/useCart', () => ({
  useCart: () => ({ totalCount: 0 })
}))

function Providers({ children }) {
  const CartContext = require('../../context/cartContext').CartContext
  const mockValue = { totalCount: 0 }
  return (
    <CartContext.Provider value={mockValue}>
      <MemoryRouter>{children}</MemoryRouter>
    </CartContext.Provider>
  )
}

test('renderiza links básicos del header', () => {
  render(<Providers><Header /></Providers>)
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Productos')).toBeInTheDocument()
  expect(screen.getByText(/Carrito \(0\)/)).toBeInTheDocument()
})
