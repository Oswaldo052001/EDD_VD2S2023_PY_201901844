import React from 'react'

function Login() {
  return (

<section classname="text-center text-lg-start">
  <style  dangerouslySetInnerHTML={{__html: "\n      .cascading-right {\n        margin-right: -50px;\n      }\n  \n      @media (max-width: 991.98px) {\n        .cascading-right {\n          margin-right: 0;\n        }\n      }\n    " }} />
  {/* Jumbotron */}
  <div className="container py-4">
    <div className="row g-0 align-items-center">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="card cascading-right" style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
          <div className="card-body p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Inicio de sesión</h2>
            <form>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" />
                <label className="form-label" htmlFor="form3Example3">Usuario</label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" />
                <label className="form-label" htmlFor="form3Example4">Contraseña</label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Iniciar sesión
              </button>
              
              {/* Submit button */}

              <div className="form-outline mb-4">
              <button type="submit" className="btn btn-dark">
                Portal tutor
              </button>
              </div>


            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-5 mb-lg-0">
        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt />
      </div>
    </div>
  </div>
  {/* Jumbotron */}
</section>


  )
}

export default Login

