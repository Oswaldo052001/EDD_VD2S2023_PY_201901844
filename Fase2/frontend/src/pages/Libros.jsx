import React, { useEffect, useState } from "react";


function Libros() {
  const [libros, setLibros] = useState([]);
  const [eleccion, setEleccion] = useState(0);

  useEffect(() => {
    async function PedirLibros() {
      const response = await fetch("http://localhost:4000/enviar-libros-admin");
      const result = await response.json();
      console.log(result);
      if (result.status === 200) {
        setLibros(result.Arreglo);
      }
    }
    PedirLibros();
  }, []);


  const handleChange = (e) => {
    var j = parseInt(e.target.value);
    setEleccion(j);
    console.log(j);
  };

  const LibrosObtenidos = () => {
    console.log(libros);
    return (
      <div>
        <select
          className="form-control"
          aria-label=".form-select-lg example"
          onChange={handleChange}
        >
          <option value={0}>Elegir Libro....</option>
          {libros.map((item, j) => (
            <option value={j} key={j}>
              {item.Nombre}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const LibrosDefault = () => {
    console.log(libros);
    return (
      <div>
        <select
          className="form-control"
          aria-label=".form-select-lg example"
          onChange={handleChange}
        >
          <option value={0}>Elegir Libro....</option>
        </select>
      </div>
    );
  };

  const aceptar = async (e) => {
    e.preventDefault();
    const valorLocal = localStorage.getItem("user");
    if (libros.length > 0) {
      const response = await fetch("http://localhost:4000/registrar-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Accion: "Aceptado",
          Nombre: libros[eleccion].Nombre,
          Tutor: libros[eleccion].Tutor,
          Curso: libros[eleccion].Curso,
        }),
      });

      const result = await response.json();
    }
  };

  const rechazar = async (e) => {
    e.preventDefault();
    const valorLocal = localStorage.getItem("user");
    if (libros.length > 0) {
      const response = await fetch("http://localhost:4000/registrar-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Accion: "Rechazado",
          Nombre: libros[eleccion].Nombre,
          Tutor: libros[eleccion].Tutor,
        }),
      });

      const result = await response.json();
    }
  };

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

      <div id ="contenedorlibros">
        <div id="principal">
          <div className="sidebar-box">
            {libros.length > 0 ? <LibrosObtenidos /> : <LibrosDefault />}
          </div>
        </div>

        <div id="sidebar2">
          <button type="button" className="btn btn-success" onClick={aceptar}>ACEPTAR</button>
          <button type="button" className="btn btn-danger" onClick={rechazar}>RECHAZAR</button>
        </div>
      </div>
    </div>

  )
}

export default Libros