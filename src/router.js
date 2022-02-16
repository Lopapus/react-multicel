import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Home, Login, Page404, Users } from './pages'
import Workspace from './layouts/Admin/Workspace'
import SessionProvider, { SessionContext } from './contexts/SessionProvider'
import { useContext } from 'react'

const Rutas = () => {
  const session = useContext(SessionContext)[0]

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {
          // Rutas a las que puede acceder el usuario logueado
          session &&
          <Route path="/" element={<Workspace />} >
            <Route index element={<Home />} />
            <Route path="cuenta" element={<div>Informacion de la cuenta</div>} />
            {
              // Rutas privadas a las que solo puede acceder el administrador
              session.rol === 'admin' &&
              <Route path="usuarios" element={<Users />} />
            }
          </Route>
        }
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

const Routing = () => {
  return (
    <SessionProvider>
      <Rutas/>
    </SessionProvider>
  )
}

export default Routing
