import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function CargarTutores() {
  return (

    <div>
        <header>
            <nav>
            <a  href="/admin">Inicio</a>
            <a  href="#">Cargar Estudiantes</a>
            <a  href="#">Libros</a>
            <a  href="#">Reportes</a>
            </nav>

        <section className="textos-header">
        <img className="logo" src="img/portada.png"/>
        </section>

        <div className="wave" style={{height: 150, overflow: 'hidden'}}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#fff'}} />
        </svg></div>
        </header>

        <h1 className='titulos'>ESTUDIANTES ACTIVOS</h1>
        
        <div id="contenedor">

            <div id ="principal">
            <table>
                <thead>
                <tr>
                    <th>Descripción</th><th>Mes</th><th>Costo</th>
                </tr>
                </thead>
                <tbody><tr>
                    <td>Agua</td><td>Enero</td><td>$ 3,000</td>
                </tr>
                <tr>
                    <td>Luz</td><td>Febrero</td><td>$ 5,500</td>
                </tr>
                <tr>
                    <td>Coche</td><td>Marzo</td><td>$ 10,100</td>
                </tr>
                <tr>
                    <td>Internet</td><td>Abril</td><td>$ 450</td>
                </tr>
                </tbody></table>
            </div>

            <div id ="sidebar">
            <h4 style={{textAlign: 'center'}}>CARGAR ESTUDIANTES</h4>
                <br/>
                <form>
                    <div className="form-group">
                    <label>INGRESE LA RUTA DEL ARCHIVO </label> <hr />
                    <input type="text" className="form-control" placeholder="ruta (.csv)" />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Cargar</button>
                </form>
            </div>
        </div>
        <br /><br /><br /><br /><br />
    </div>



    
  )
}

export default CargarTutores