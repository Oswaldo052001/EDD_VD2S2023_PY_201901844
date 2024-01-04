import React from 'react'

function Alumno() {
  return (
    <div>
    <div id="MenuAlumno">
      <nav>
        <a href="/vercursos">Cursos</a>
        <a href="/verlibros">Ver libros</a>
        <a href="/verpublicaciones">Ver publicaciones</a>
        <a href="/">Cerrar sesión</a>
      </nav>
      <section className="textos">
        <h1>MENÚ ALUMNO</h1>
        <img className="logo" src="img/portada.png" />
      </section>
      <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
      </svg></div>
    </div>
  </div>
  )
}

export default Alumno