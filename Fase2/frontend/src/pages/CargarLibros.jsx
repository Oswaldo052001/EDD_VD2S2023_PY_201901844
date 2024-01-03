import React, { useState } from "react";

function CargarLibros() {
  const [contenidoPDF, setContenidoPDF] = useState("");
  const uploadFileTutor = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;
      console.log(content);
      setContenidoPDF(content);
      const valorLocal = localStorage.getItem("user");
      const response = await fetch("http://localhost:4000/registrar-libro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carnet: parseInt(valorLocal),
          Nombre: file.name,
          Contenido: content,
        }),
      });

      const result = await response.json();
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsDataURL(file);
  };

    return (
        <div>
            <div id="MenuTutor">
                <nav>
                    <a href="/menu-tutores">Inicio</a>
                    <a href="/cargarPublicacion">Crear Publicación</a>
                </nav>
                <section className="textos">
                    <img className="logo" src="img/portada.png" />
                </section>

                <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                    <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
                </svg></div>
            </div>
            <br />
            <h1 className='titulos'>CARGA PDF</h1><br />
            <div className="form-signin1">
                <form>
                    <div className="form-group">
                        <label>CARGAR LIBRO</label> <hr />
                        <input
                            className="form-control"
                            id="inputGroupFile01"
                            type="file"
                            accept=".pdf"
                            onChange={uploadFileTutor}
                        />
                    </div>
                    <br />
                </form>
            </div>
            <div className="pdf">
                <iframe src={contenidoPDF} width="70%" height="1000" />
            </div>
            <br /><br /><br />
        </div>
    )
}

export default CargarLibros