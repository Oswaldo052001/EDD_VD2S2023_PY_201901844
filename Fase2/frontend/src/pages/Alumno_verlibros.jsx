import React, { useState, useEffect } from "react";

function Alumno_verlibros() {
  const [cursos, setCursos] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    async function PedirCursos() {
      const arregloCursos = localStorage.getItem("cursos");
      const cursosArreglo = JSON.parse(arregloCursos);
      const response = await fetch(
        "http://localhost:4000/obtener-libros-alumno"
      );
      const result = await response.json();
      console.log(result);
      setCursos(cursosArreglo);
      if (result.status === 200) {
        setLibros(result.Arreglo);
      }
    }
    PedirCursos();
  }, []);

  const Palabra = () => {
    return (
      <div className="row">
        <div className="row align-items-start">
          {cursos.map((item, i) => (
            <div className="form-signin1 col" key={"CursoEstudiante" + i}>
              <div className="text-center">
                <div className="card card-body">
                  <h1 className="text-left" key={"album" + i} value={i}>
                    {item}
                  </h1>
                  <div>
                    <span
                      className="input-group-text"
                      id="validationTooltipUsernamePrepend"
                    ></span>{" "}
                    <br />
                    {libros.map((ite, j) => {
                      if (ite.Curso === item) {
                        return (
                          <div key={"p-" + i}>
                            <label className="input-group-text" key={"lib" + j}>
                              {ite.Nombre}
                            </label>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div id="MenuAlumno">
        <nav>
          <a href="/menu-alumnos">Inicio</a>
          <a href="/vercursos">Cursos</a>
          <a href="/verpublicaciones">Ver publicaciones</a>
        </nav>
        <section className="textos">
          <img className="logo" src="img/portada.png" />
        </section>
        <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
          <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
        </svg></div>
      </div>
      <h1 className='titulos'>LIBROS DISPONIBLES</h1>

      <div className="form-signin1">
        <div className="text-center">
          <form className="card card-body">
            <br />
            {cursos.length > 0 ? <Palabra /> : null}
            <br />
            <p className="mt-5 mb-3 text-muted">EDD 201901844</p>
            <br />
          </form>
        </div>
      </div>
      <br /><br />
    </div>
  )
}

export default Alumno_verlibros