import React from 'react'

function Tutor() {
  return (
    <div>
    <div id="MenuTutor">
      <nav>
        <a href="/cargarLibro">Cargar Libro</a>
        <a href="/cargarPublicacion">Crear Publicación</a>
        <a href="/">Cerrar sesión</a>
      </nav>
      <section className="textos">
        <h1>MENÚ TUTOR</h1>
        <img className="logo" src="img/portada.png" />
      </section>
      <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
      </svg></div>
    </div>
  </div>
  )
}

export default Tutor