import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Carrito from '../Carrito'

jest.mock('../../services/auth', () => ({
  getToken: () => 'tok',
  getCurrentUser: () => ({ email: 'user@example.com' })
}))

const makeCartMock = items => ({
  items,
  totalPrice: items.reduce((s, i) => s + i.precio * i.cantidad, 0),
  updateQuantity: jest.fn(),
  removeItem: jest.fn()
})

jest.mock('../../context/useCart', () => ({
  useCart: () => makeCartMock([
    { nombre: 'Pantuflas', precio: 2000, cantidad: 1, stock: 5, descripcion: 'desc', foto: '/img.png' }
  ])
}))

test('muestra resumen y totales del carrito con un item', async () => {
  render(<MemoryRouter><Carrito /></MemoryRouter>)
  expect(screen.getByText('Resumen del Carrito')).toBeInTheDocument()
  expect(screen.getByText('Pantuflas')).toBeInTheDocument()
  expect(screen.getByText('$2,000')).toBeInTheDocument()
  expect(screen.getByText(/Stock: 5/)).toBeInTheDocument()
  const checkbox = screen.getByLabelText('Acepto las condiciones establecidas en el Centro de Ayuda.')
  const checkoutBtn = screen.getByRole('button', { name: /Proceder al Checkout/ })
  expect(checkoutBtn).toBeDisabled()
  await userEvent.click(checkbox)
  expect(checkoutBtn).not.toBeDisabled()
})
