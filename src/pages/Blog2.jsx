import React from 'react'
import { Link } from 'react-router-dom'

export default function Blog2() {
  return (
    <div className="container">
      <nav aria-label="breadcrumb" style={{ marginTop: '10px', marginLeft: '20px' }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/blogs" className="a-volver a:hover">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Agenda de Novios pt II</li>
        </ol>
      </nav>

      <hr />

      <article>
        <div className="container">
          <h1>Agenda de Novios pt II: ¿Por dónde empezar a organizar una boda?</h1>
          <p><small><em>- Publicado 07/10/2024.</em></small></p>

          <div className="text-center">
            <img src="/img/agenda2.png" alt="agenda2" className="img-fluid mb-4" style={{ width: '50%' }} />
          </div>

          <p style={{ textAlign: 'justify' }}>
            <strong>¿Por dónde empezar a organizar una boda?!</strong> Desde enviar el Save the Date hasta elegir el vestido de novia y las alianzas,
            cada decisión los acercará más a la boda de sus sueños. Aquí tienes los pasos esenciales para asegurarte de que todo salga perfecto.
          </p>

          <p style={{ textAlign: 'justify' }}>
            En el carrusel anterior vimos lo que deberían organizar idealmente del mes 10 al 12. En esta ocasión veremos los pasos del mes 7 al 9,
            recuerda que siempre pueden acomodar las labores según tu propio calendario.
          </p>

          <hr />

          <h2 className="mb-4">De 7 a 9 meses</h2>

          <ul className="mb-4" style={{ listStylePosition: 'inside' }}>
            <li className="mb-3"><strong>Enviar el Save the Date:</strong> Para que los invitados desde ya reserven la fecha.</li>
            <li className="mb-3"><strong>Crear la web del matrimonio:</strong> Con la información revelada, estarán en condiciones de abrir su web en <a href="https://www.matrimonios.cl/" className="text-decoration-none">Matrimonios.cl</a>.
              Es un espacio gratuito donde podrán subir fotos, contar datos inéditos de su historia de amor y entregar información práctica, a medida que avancen en los preparativos.
            </li>
            <li className="mb-3"><strong>Contratar fotografía y videos:</strong> Serán el recuerdo que les quedará de su gran día, por lo que deben elegir a estos proveedores con especial rigurosidad.</li>
            <li className="mb-3"><strong>Contratar música:</strong> Incluye al DJ, pero también si querrán contar con un coro en la ceremonia o con una orquesta en la fiesta, entre otras opciones.</li>
            <li className="mb-3"><strong>Buscar el vestido de novia:</strong> Será uno de los procesos más emocionantes para la futura esposa. Además, es un buen momento para mejorar los hábitos de alimentación, hacer deporte y empezar a cuidar de la piel y el cabello, si no es parte de su rutina.</li>
            <li className="mb-3"><strong>Buscar las alianzas:</strong> Sobre todo si desean un diseño personalizado, no esperen más y enfóquense en encontrar sus anillos de matrimonio.</li>
          </ul>

          <p><small><em>Fuente: <a href="https://www.matrimonios.cl/">matrimonios.cl</a></em></small></p>
        </div>
      </article>
    </div>
  )
}