import React from 'react'

export default function Contacto() {
  return (
    <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h2>Contacto</h2>
      <form id="contactoForm" noValidate>

        <div className="container">
          <p><small>(*) Obligatorio.</small></p>
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-bold">Nombre (*)</label>
          <input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" maxLength={100} required />
          <div id="nombreError" className="text-danger small"></div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Correo Electrónico (*)</label>
          <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" maxLength={100} required />
          <div id="emailError" className="text-danger small"></div>
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label fw-bold">Comentario (*)</label>
          <textarea className="form-control" id="mensaje" rows={4} placeholder="Escribe tu mensaje aquí" maxLength={500} required></textarea>
          <div id="mensajeError" className="text-danger small"></div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>

      </form>
    </div>
  )
}