import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" style={{ marginTop: '40px' }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <div>
              <h5 className="footer-title">Información</h5>
              <hr />
              <ul className="list-unstyled footer-list">
                <li><NavLink to="/condiciones">Centro de Ayuda</NavLink></li>
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <div>
              <h5 className="footer-title">Contacto</h5>
              <hr />
              <ul className="list-unstyled footer-list">
                <li><strong>Tel:</strong> +56 9 9097 9356</li>
                <li><strong>Email:</strong> clientes@colorcreativo.cl</li>
                <li>
                  <a href="https://maps.app.goo.gl/mKFYFoK1RRAh1fNA9" target="_blank" rel="noreferrer">
                    <strong>Dirección:</strong> Miguel Pino Torres 7666, Cerrillos, Santiago
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <div>
              <h5 className="footer-title">Redes Sociales</h5>
              <hr />
              <ul className="list-unstyled footer-list">
                <li><a href="https://www.instagram.com/colorcreativocl" target="_blank" rel="noreferrer"><img src="/img/logoig2.png" alt="Instagram" style={{ width: '20px', height: '20px' }} /> colorcreativocl</a></li>
                <li><a href="https://web.facebook.com/ColorCreativo/?locale=es_LA&_rdc=1&_rdr#" target="_blank" rel="noreferrer"><img src="/img/logoface.png" alt="Facebook" style={{ width: '20px', height: '20px' }} /> Color Creativo</a></li>
                <li><a href="https://wa.me/56990979356" target="_blank" rel="noreferrer"><img src="/img/logowsp.png" alt="WhatsApp" style={{ width: '20px', height: '20px' }} /> Color Creativo</a></li>
                <li><a href="https://www.tiktok.com/@colorcreativocl?_t=ZM-8zW3uMAYhrq&_r=1" target="_blank" rel="noreferrer"><img src="/img/logotikitok.png" alt="TikTok" style={{ width: '20px', height: '20px' }} /> Color Creativo</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p>&copy; 2025 Color Creativo</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
