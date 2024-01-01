import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Libros() {
    return (
        <div>
            <div id="Libros">
                <nav>
                    <a href="/admin">Inicio</a>
                    <a href="/CargaMasiva">Cargar de archivos</a>
                    <a href="/Tabla-alumnos">Tabla alumnos</a>
                    <a href="/Reportes">Reportes</a>
                </nav>

                <section className="Textos">
                    <img className="logo" src="img/portada.png" />
                </section>

                <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                    <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
                </svg></div>
            </div>

            <h1 className='titulos'>LIBROS INGRESADOS</h1>

            <div id="contenedor">

                <div id="principal">
                    <div className="sidebar-box">
                        <select>
                            <option selected="true" disabled="disabled">Elija el nombre del libro</option>
                            <option>Lunes</option>
                            <option>Martes</option>
                            <option>Miércoles</option>
                            <option>Jueves</option>   
                            <option>Viernes</option>
                        </select>
                    </div>
                </div>

                <div id="sidebar2">
                    <button type="button" className="btn btn-success">ACEPTAR</button>
                    <button type="button" className="btn btn-danger">RECHAZAR</button>
                </div>
            </div>


        </div>

    )
}

export default Libros