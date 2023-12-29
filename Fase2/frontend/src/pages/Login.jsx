import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: userName,
        Password: passwordUser,
        Tutor: isChecked,
      }),
    });

    const result = await response.json();
    if (result.rol == 0) {
      alert("Credenciales Incorrectas");
    } else if (result.rol == 1) {
      window.open("/Admin", "_self");
    }
  };

  return (

    <section className="text-center text-lg-start">
      <style dangerouslySetInnerHTML={{ __html: "\n      .cascading-right {\n        margin-right: -50px;\n      }\n  \n      @media (max-width: 991.98px) {\n        .cascading-right {\n          margin-right: 0;\n        }\n      }\n    " }} />

      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Inicio de sesión</h2>
                <form onSubmit={handleSubmit}>
                  {/* Usuario input */}
                  <div className="form-outline mb-4">
                    <input 
                    type="text" 
                    id="userI" 
                    className="form-control" 
                    placeholder="Nombre Usuario" 
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                    />
                    <label className="form-label">Usuario</label>
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <input 
                    type="password"
                    id="passI" 
                    className="form-control"
                    placeholder="Password"
                    aria-describedby="passwordHelpInline" //required
                    value={passwordUser}
                    onChange={(e) => setPasswordUser(e.target.value)}
                    autoFocus
                    />
                    <label className="form-label">Contraseña</label>
                  </div>


                  <div className="form-check form-switch text-left">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      value={isChecked}
                      onChange={(e) => setIsChecked(!isChecked)}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault" > Tutor </label>
                  </div> 
                  <br />

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Iniciar sesión
                  </button>

                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt />
          </div>
        </div>
      </div>
    </section>


  )
}

export default Login

