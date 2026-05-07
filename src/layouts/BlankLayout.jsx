import React from 'react'
import { Outlet } from 'react-router-dom'

export default function BlankLayout() {
  return (
    <main className="page-container">
      <Outlet />
    </main>
  )
}