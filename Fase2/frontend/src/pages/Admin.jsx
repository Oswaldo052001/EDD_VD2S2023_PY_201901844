import React from 'react'
import '../styles/estilos.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Admin() {
  return (
 <div>
  <header>
      <nav>
      <a  href="/CargaTutores">Cargar Tutores</a>
      <a  href="#">Cargar Estudiantes</a>
      <a  href="#">Libros</a>
      <a  href="#">Reportes</a>
      <a  href="/login">Cerrar sesión</a>
    </nav>
    <section className="textos-header">
      
      <h1>MENU ADMINISTRADOR</h1>
      <img className="logo" src="img/portada.png"/>

    </section>
    <div className="wave" style={{height: 150, overflow: 'hidden'}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
        <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#fff'}} />
      </svg></div>
  </header>
</div>
  )
}

export default Admin