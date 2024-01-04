import React from 'react'


function Admin_Reportes() {

    const ReporteArbolB = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/generar-reporte-arbolB", {
            method: "GET",
        });
    }

    const ReporteMerkle = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/generar-reporte-merkle", {
            method: "GET",
        });
    }


    const Reportecursos = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/generar-reporte-grafo", {
            method: "GET",
        });
    }

    return (
        <div>
            <div id="Reportes">
                <nav>
                    <a href="/admin">Inicio</a>
                    <a href="/CargaMasiva">Cargar de archivos</a>
                    <a href="/Tabla-alumnos">Tabla alumnos</a>
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

            <div className="ContenedorReporte">
                <form onSubmit={ReporteArbolB}>
                    <button type="submit" className="btn btn-primary">Reporte Arbol B</button>
                </form>
                <form onSubmit={Reportecursos}>
                    <button className="btn btn-warning">Reporte Grafo</button>
                </form >
                <form onSubmit={ReporteMerkle}>
                    <button className="btn btn-success">Reporte Arbol Merkle</button>
                </form>
            </div>

        </div>



    )
}

export default Admin_Reportes