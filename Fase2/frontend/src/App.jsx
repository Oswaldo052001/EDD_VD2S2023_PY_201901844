import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Tutores from './pages/CargarTutores'
import Estudiantes from './pages/CargaEstudiantes'
import Libros from './pages/Libros'
import Reportes from './pages/Reportes'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <Routes>
          <Route path = '/' element={<Login/>} />
          <Route path = '/Admin' element={<Admin/>} />
          <Route path = '/CargaTutores' element={<Tutores/>} />
          <Route path = '/CargaEstudiantes' element={<Estudiantes/>} />
          <Route path = '/Libros' element={<Libros/>} />
          <Route path = '/Reportes' element={<Reportes/>} />
        </Routes>
      </>
  )
}

export default App
