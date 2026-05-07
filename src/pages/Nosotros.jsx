import React from 'react'

export default function Nosotros() {
  return (
    <>
      <div className="container" style={{ marginTop: '20px' }}>
        <h1 className="display-5 text-center">Nosotros</h1>
        <div className="row align-items-start" style={{ marginTop: '20px' }}>
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <img src="/img/hilda.png" className="img-fluid rounded-circle" alt="Dueño" style={{ width: '80px', height: '80px', objectFit: 'cover', marginTop: '55px' }} />
          </div>
          <div className="col-md-10">
            <div className="blockquote">
              <h5 className="mb-0 fw-bold">Hilda Pavez Acevedo</h5>
              <p className="text-muted mb-2"><em>— Dueña y Diseñadora Gráfica.</em></p>
              <p style={{ textAlign: 'justify' }}>
                <small>
                  Desde el año 2000 trabajo en el área del diseño. Soy titulada de Diseño Gráfico y Multimedia.
                  Y en el año 2011 creé Color Creativo, regalos personalizados y publicitarios. Estoy en Matrimonios.cl desde el año 2018 para crear recuerdos personalizados,
                  pensando especialmente en ayudar a novias y novios que aunque no tienen mucho tiempo quieren que sus invitados tengan un detalle único, original y personalizado de su gran día.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="opiniones" className="py-5 bg-light" style={{ marginTop: '20px' }}>
        <div className="container">
          <h3 className="text-center mb-3 display-6">Testimonios</h3>

          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <p className="lead">Lo que dicen nuestros clientes en</p>
              </div>
            </div>
          </div>

          <div className="container text-center mb-4">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <a href="https://www.matrimonios.cl/recuerdos-matrimonios/color-creativo--e112346">
                  <img src="/img/MatriLogo.png" alt="Matrimonios.cl" className="img-fluid" style={{ maxWidth: '200px' }} />
                </a>
              </div>
            </div>
          </div>

          <blockquote className="blockquote mx-auto" style={{ maxWidth: '600px' }}>
            <p className="mb-0" style={{ textAlign: 'justify' }}>
              "Captó a la perfección lo que queríamos. Da respuesta rápida y el envío de los productos es súper rápido,
              la calidad de los productos es muy buena, además queríamos un diseño personalizado por lo que le explicamos lo que queríamos y realizó el diseño,
              nos encantó. Totalmente recomendable"
            </p>
            <footer className="blockquote-footer mt-2">
              <small>Camila - 17/03/2025</small>
            </footer>
          </blockquote>

          <hr />

          <blockquote className="blockquote mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <p className="mb-0" style={{ textAlign: 'justify' }}>
              "Muy buena calidad!! Todo fue muy bueno, nos ayudó a hacer modificaciones a un diseño base y luego llegó todo bien y a tiempo.
              Las pantuflas quedaron muy buenas! Gracias!"
            </p>
            <footer className="blockquote-footer mt-2">
              <small>Francisco - 06/02/2025</small>
            </footer>
          </blockquote>

          <hr />

          <blockquote className="blockquote mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <p className="mb-0" style={{ textAlign: 'justify' }}>
              "Excepcional!! Agradecer la paciencia, profesionalismo y ayuda de Hilda, de verdad que es muy grato poder contar con servicios de una gran calidad.
              Le mandamos a hacer pantuflas personalizadas y quedaron hermosas, tal cual era nuestra idea. De gran calidad, muy buen estampado y en tiempo récord.
              Muchas gracias Hilda por tu gran trabajo"
            </p>
            <footer className="blockquote-footer mt-2">
              <small>Ignacio - 09/08/2024</small>
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  )
}