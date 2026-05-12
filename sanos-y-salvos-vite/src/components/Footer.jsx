import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm font-medium">
          © {new Date().getFullYear()} Sanos y Salvos (cl) · Recuperación de mascotas
        </p>
      </div>
    </footer>
  )
}
