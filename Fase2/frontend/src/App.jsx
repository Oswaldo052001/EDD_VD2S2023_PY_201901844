import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Tabla from './pages/Tabla'
import Cargamasiva from './pages/CargaMasiva'
import Libros from './pages/Libros'
import Reportes from './pages/Reportes'
import Tutores from './pages/Tutor'
import SubirLibro from './pages/CargarLibros'
import Subirpublicacion from './pages/CargarPublicacion'
import Alumnos from './pages/Alumno'


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
        </Routes>
      </>
  )
}

export default App
