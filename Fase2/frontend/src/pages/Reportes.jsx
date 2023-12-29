import React from 'react'


function Reportes() {
    return (
        <div>
            <div id="Reportes">
                <nav>
                    <a href="/admin">Inicio</a>
                    <a href="/CargaTutores">Cargar Tutores</a>
                    <a href="/CargaEstudiantes">Cargar Estudiantes</a>
                    <a href="/Libros">Libros</a>
                </nav>

                <section className="Textos">
                    <img className="logo" src="img/portada.png" />
                </section>

                <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                    <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
                </svg></div>
            </div>

            <h1 className='titulos'>REPORTES</h1>

            <div className="contenedor">
                    <button className="btn btn-primary">Reporte Arbol B</button>
                    <button className="btn btn-warning">Reporte Grafo</button>
                    <button className="btn btn-success">Reporte Arbol Merkle</button>
            </div>

        </div>



    )
}

export default Reportes