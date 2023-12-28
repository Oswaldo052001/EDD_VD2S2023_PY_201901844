import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Tutores from './pages/CargarTutores'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <Routes>
          <Route path = '/' element={<Login/>} />
          <Route path = '/Admin' element={<Admin/>} />
          <Route path = '/CargaTutores' element={<Tutores/>} />
        </Routes>
      </>
  )
}

export default App
