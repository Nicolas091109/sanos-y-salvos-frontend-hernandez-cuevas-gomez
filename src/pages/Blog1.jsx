import React from 'react'
import { Link } from 'react-router-dom'

export default function Blog1() {
  return (
    <div className="container">
      <nav aria-label="breadcrumb" style={{ marginTop: '10px', marginLeft: '20px' }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/blogs" className="a-volver a:hover">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Agenda de Novios pt I: ¿Por dónde empezar a organizar una boda?</li>
        </ol>
      </nav>

      <hr />

      <article>
        <div className="container">
          <h1>Agenda de Novios pt 1: ¿Por dónde empezar a organizar una boda?</h1>
          <p><small><em>- Publicado 20/09/2024.</em></small></p>

          <div className="text-center">
            <img src="/img/agenda1.png" alt="agenda1" className="img-fluid mb-4" style={{ width: '50%' }} />
          </div>

          <p style={{ textAlign: 'justify' }}>
            Para que no se les pase ninguna tarea, aquí encontrarán un paso a paso disponiendo de un año para organizar
            el festejo. Pero si tendrán más o menos tiempo, siempre podrán acomodar las distintas labores según su propio calendario.
          </p>

          <hr />

          <h2 className="mb-4">De 10 a 12 meses</h2>

          <ul style={{ marginLeft: '20px' }}>
            <li style={{ marginBottom: '15px' }}>
              <strong>Definir fecha y tipo de ceremonia:</strong> tendrán que resolver si será religiosa o por el civil, masiva o íntima,
              de estilo urbano, campestre o en la playa. Esto les permitirá delinear los aspectos generales.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Establecer presupuesto:</strong> ¿cuánto invertirán en la boda? Es clave que definan un monto a gastar, así como un promedio
              de cuánto destinarán a cada ítem.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Descargar la App de <a href="https://www.matrimonios.cl/" className="text-decoration-none">Matrimonios.cl</a>:</strong> la Agenda de Tareas será su mejor aliada en la organización de la boda.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Gestionar papeleo:</strong> infórmense sobre los requisitos y trámites para contraer nupcias, tanto si se casarán por la iglesia como por el civil.
              De hecho, en ambos casos necesitarán pedir hora con mucha anticipación.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Arma la lista de invitados:</strong> aunque más adelante podrán ajustarla, es importante contar con una primera lista para empezar a cotizar proveedores.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Contratar locación y banquetera:</strong> después de evaluar opciones, lo que apremia es contratar el centro de eventos y la banquetería,
              pues son los ítems más demandados.
            </li>
          </ul>

          <p><small><em>Fuente: <a href="https://www.matrimonios.cl/">matrimonios.cl</a></em></small></p>
        </div>
      </article>
    </div>
  )
}