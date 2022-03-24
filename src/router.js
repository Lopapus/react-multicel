import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { CreateUsers, Home, Login, Page404, Test, UserAccount, Users } from './pages'
import Workspace from './layouts/Admin/Workspace'
import SessionProvider, { SessionContext } from './contexts/SessionProvider'
import { useContext } from 'react'
import EditUser from './pages/EditUser'
import ViewUser from './pages/ViewUser'
import EditPassword from './pages/EditPassword'

const Rutas = () => {
  const session = useContext(SessionContext)[0]

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {
          // Rutas a las que puede acceder el usuario logueado
          session &&
          <>
            <Route path="/" element={<Workspace />} >
              <Route index element={<Home />} />
              <Route path="cuenta">
                <Route index element={<UserAccount />} />
                <Route path=':id' element={<EditUser />} />
                <Route path='clave:id' element={<EditPassword />} />
              </Route>
              {
                // Rutas privadas a las que solo puede acceder el administrador
                session.rol === 'admin' &&
                <Route path="usuarios">
                  <Route index element={<Users />} />
                  <Route path='info/:id' element={<ViewUser />} />
                  <Route path='info/' element={<Navigate to='../' />} />
                  <Route path="crear" element={<CreateUsers />} />
                  <Route path=":id" element={<CreateUsers />} />
                </Route>
              }
            </Route>
            <Route path="*" element={<Page404 />} />
          </>
        }
        <Route path="test" element={<Test />} />
        <Route path="*" element={<Navigate to="login" />} />
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
