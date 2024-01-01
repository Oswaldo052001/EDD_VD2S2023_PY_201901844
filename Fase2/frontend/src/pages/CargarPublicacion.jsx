import React, { useState } from "react";

function CargarPublicacion() {

  const [publicacion, setPublicacion] = useState("");

  const MandarPublicacion = async (event) => {
    event.preventDefault();
    const valorLocal = localStorage.getItem("user");
    const response = await fetch("http://localhost:4000/registrar-publicacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Carnet: parseInt(valorLocal),
        Contenido: publicacion,
      }),
    });
  };

  return (
    <div>
      <div id="MenuTutor">
        <nav>
          <a href="/menu-tutores">Inicio</a>
          <a href="/cargarLibro">Cargar Libro</a>
        </nav>
        <section className="textos">
          <img className="logo" src="img/portada.png" />
        </section>

        <div className="wave" style={{ height: 150, overflow: 'hidden' }}><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
          <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff' }} />
        </svg></div>
      </div>
      <br />
            <h1 className='titulos'>REALIZAR PUBLICACIÓN</h1><br />
            <div className="form-publicacion">
                <form onSubmit={MandarPublicacion}>
                    <div className="form-group">
                        <textarea
                            className="textbox"
                            id="inputGroupFile01"
                            type="text"
                            placeholder="Escriba el contenido que deseé"
                            value={publicacion}
                            onChange={(event) => setPublicacion(event.target.value)}
                        />
                    </div>
                  {/* Submit button */}
                  <br />
                  <button type="submit" className="btn btn-outline-success">
                    publicar
                  </button>
                    <br />
                </form>
            </div>
            <br /><br /><br />
    </div>
  )
}

export default CargarPublicacion