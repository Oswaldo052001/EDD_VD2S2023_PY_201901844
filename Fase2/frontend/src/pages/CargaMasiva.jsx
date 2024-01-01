import React, { useState } from "react";

function CargaMasiva() {

  const uploadFileTutor = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);
      parsedData.map(async (row) => {
        if (row.length > 1) {
          const response = await fetch(
            "http://localhost:4000/registrar-tutor",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Carnet: parseInt(row[0]),
                Nombre: row[1],
                Curso: row[2],
                Password: row[3],
              }),
            }
          );

          const result = await response.json();
        }
      });
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsText(file);
  };

  const uploadFileAlumno = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);
      console.log(parsedData);
      parsedData.map(async (row) => {
        if (row.length > 1) {
          const response = await fetch(
            "http://localhost:4000/registrar-alumno",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Carnet: parseInt(row[0]),
                Nombre: row[1],
                Password: row[2],
                Cursos: [row[3], row[4], row[5]],
              }),
            }
          );
          const result = await response.json();
        }
      });
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsText(file);
  };

  const UploadCursos = (e) => {
    var reader = new FileReader();
    reader.onload = async (e) => {
      var obj = JSON.parse(e.target.result);
      console.log(obj);
      const response = await fetch("http://localhost:4000/registrar-cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cursos: obj.Cursos,
        }),
      });
    };
    reader.readAsText(e.target.files[0]);
  };


  const parseCSV = (csvContent) => {
    const rows = csvContent.split("\n");
    const encabezado = rows.slice(1);
    const sinRetorno = encabezado.map((row) => row.trim());
    const data = sinRetorno.map((row) => row.split(";"));
    return data;
  };


  return (
    <div>
      <div id="Estudiantes">
        <nav>
          <a href="/admin">Inicio</a>
          <a href="/Tabla-alumnos">Tabla alumnos</a>
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

      <h1 className='titulos'>CARGA DE ARCHIVOS</h1><br />


      <div className="form-signin1">

        <form>
          <div className="form-group">
            <label>CARGA DE TUTORES </label> <hr />
            <input
              className="form-control"
              id="inputGroupFile01"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={uploadFileTutor}
            />
          </div>
        </form>
        <br /><br />
        <form>
          <div className="form-group">
            <label>CARGA DE ESTUDIANTES </label> <hr />
            <input
              className="form-control"
              id="inputGroupFile01"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={uploadFileAlumno}
            />
          </div>
        </form>
        <br /><br />
        <form>
          <div className="form-group">
            <label>CARGA DE CURSOS </label> <hr />
            <input
              className="form-control"
              id="inputGroupFile02"
              type="file"
              accept="application/json"
              onChange={UploadCursos}
            />
          </div>
        </form>
        <br /><br />
      </div>



    </div>

  )
}

export default CargaMasiva