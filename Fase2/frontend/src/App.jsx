import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

//PAGINAS ADMIN
import Admin from './pages/Admin'
import Tabla from './pages/Admin_Tabla'
import Cargamasiva from './pages/Admin_CargaMasiva'
import Libros from './pages/Admin_Libros'
import Reportes from './pages/Admin_Reportes'

//PAGINAS TUTOR
import Tutores from './pages/Tutor'
import SubirLibro from './pages/Tutor_CargarLibros'
import Subirpublicacion from './pages/Tutor_CargarPublicacion'

//PAGINAS ALUMNO
import Alumnos from './pages/Alumno'
import Vercursos from './pages/Alumno_cursos'
import Verlibros from './pages/Alumno_verlibros'
import Verpublicaciones from './pages/Alumno_verpublicaciones'


function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <Routes>
          <Route path = '/' element={<Login/>} />
          <Route path = '/Admin' element={<Admin/>} />
          <Route path = '/Tabla-alumnos' element={<Tabla/>} />
          <Route path = '/CargaMasiva' element={<Cargamasiva/>} />
          <Route path = '/Libros' element={<Libros/>} />
          <Route path = '/Reportes' element={<Reportes/>} />

          <Route path = '/menu-tutores' element={<Tutores/>} />
          <Route path = '/cargarLibro' element={<SubirLibro/>} />
          <Route path = '/cargarPublicacion' element={<Subirpublicacion/>} />

          <Route path = '/menu-alumnos' element={<Alumnos/>} />
          <Route path = '/vercursos' element={<Vercursos/>} />
          <Route path = '/verlibros' element={<Verlibros/>} />
          <Route path = '/verpublicaciones' element={<Verpublicaciones/>} />
        </Routes>
      </>
  )
}

export default App
