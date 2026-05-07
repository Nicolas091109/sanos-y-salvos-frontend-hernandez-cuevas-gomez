import React from 'react'
import { Link } from 'react-router-dom'

export default function Blogs() {
  return (
    <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h1 className="text-center mb-4">Blogs</h1>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 mb-4">
          <div className="card h-100">
            <img src="/img/agenda2.png" className="card-img-top" alt="Blog 2" />
            <div className="card-body text-center">
              <h5 className="card-title">Agenda de los Novios pt II: 7 a 9 meses</h5>
              <p className="card-text">¿Por dónde empezar a organizar una boda?</p>
              <div className="d-flex justify-content-center">
                <Link to="/blogs/blog2" className="btn botonblog">Leer Más</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6 mb-4">
          <div className="card h-100">
            <img src="/img/agenda1.png" className="card-img-top" alt="Blog 1" />
            <div className="card-body text-center">
              <h5 className="card-title">Agenda de los Novios pt I: 10 a 12 meses</h5>
              <p className="card-text">¿Por dónde empezar a organizar una boda?</p>
              <div className="d-flex justify-content-center">
                <Link to="/blogs/blog1" className="btn botonblog">Leer Más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}