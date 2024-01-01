import React, { useState, useEffect } from "react";

function Tabla() {

    const [alumnosRegistrados, SetAlumnosRegistrados] = useState([]);
    useEffect(() => {
        async function peticion() {
            const response = await fetch("http://localhost:4000/tabla-alumnos");
            const result = await response.json();
            SetAlumnosRegistrados(result.Arreglo);
        }
        peticion();
    }, []);

    return (

        <div>
            <div id="Tutores">
                <nav>
                    <a href="/admin">Inicio</a>
                    <a href="/CargaMasiva">Cargar de archivos</a>
                    <a href="/Libros">Libros</a>
                    <a href="/Reportes">Reportes</a>
                </nav>

                <section className="Textos">
                    <img className="logo" src="img/portada.png" />
                </section>

                <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                    <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
                </svg></div>
            </div>

            <h1 className='titulos'>TUTORES ACTIVOS</h1><br />

            <div id="contenedorTabla">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Posicion</th>
                            <th scope="col">Carnet </th>
                            <th scope="col">Nombre </th>
                            <th scope="col">Password </th>
                            <th scope="col">Cursos </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {alumnosRegistrados.map((element, j) => {
                            if (element.Id_Cliente != "") {
                                return (
                                    <>
                                        <tr key={"alum" + j}>
                                            <th scope="row">{j + 1}</th>
                                            <td>{element.Llave}</td>
                                            <td>{element.Persona.Carnet}</td>
                                            <td>{element.Persona.Nombre}</td>
                                            <td>{element.Persona.Password}</td>
                                            <td>{element.Persona.Cursos[0]+", "+element.Persona.Cursos[1]+", "+element.Persona.Cursos[2]}</td>
                                        </tr>
                                    </>
                                );
                            }
                        })}

                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br /><br />
        </div>
    )
}

export default Tabla