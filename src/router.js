import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import {
  CreateUsers,
  Home,
  Login,
  Page404,
  Test,
  UserAccount,
  Users,
  EditUser,
  ViewUser,
  EditPassword
} from './pages/ModuloUsuarios'
import Workspace from './layouts/Admin/Workspace'
import SessionProvider, { SessionContext } from './contexts/SessionProvider'
import { useContext } from 'react'
import {
  FormProveedor,
  InfoProveedor,
  ProductosProveedor,
  Proveedores,
  Categorias,
  Subcategorias,
  Marcas,
  FormCategorias,
  FormSubcategorias,
  FormMarcas,
  Productos,
  FormProductos,
  DetalleProducto,
  Precios
} from './pages/ModuloProductos'

const Rutas = () => {
  const session = useContext(SessionContext)[0]

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {
          // Rutas a las que puede acceder el usuario logueado
          session && (
            <>
              <Route path="/" element={<Workspace />}>
                <Route index element={<Home />} />
                <Route path="cuenta">
                  <Route index element={<UserAccount />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="clave:id" element={<EditPassword />} />
                </Route>
                {
                  // Rutas privadas a las que solo puede acceder el administrador
                  session.rol === 'admin' && (
                    <>
                      <Route path="usuarios">
                        <Route index element={<Users />} />
                        <Route path="info/:id" element={<ViewUser />} />
                        <Route path="info/" element={<Navigate to="../" />} />
                        <Route path="crear" element={<CreateUsers />} />
                        <Route path=":id" element={<CreateUsers />} />
                      </Route>
                      <Route path="proveedores">
                        <Route index element={<Proveedores />} />
                        <Route path=":id" element={<FormProveedor />} />
                        <Route path="info/" element={<Navigate to="../" />} />
                        <Route path="info/:id" element={<InfoProveedor />} />
                        <Route
                          path="productos/"
                          element={<Navigate to="../" />}
                        />
                        <Route
                          path="productos/:id"
                          element={<ProductosProveedor />}
                        />
                        <Route path="crear" element={<FormProveedor />} />
                      </Route>
                      <Route path="parametros">
                        <Route index element={<Navigate to="/" />} />
                        <Route path="categorias" element={<Categorias />} />
                        <Route
                          path="categorias/:id"
                          element={<FormCategorias />}
                        />
                        <Route
                          path="subcategorias"
                          element={<Subcategorias />}
                        />
                        <Route
                          path="subcategorias/:id"
                          element={<FormSubcategorias />}
                        />
                        <Route path="marcas" element={<Marcas />} />
                        <Route path="precios" element={<Precios />} />
                        <Route path="marcas/:id" element={<FormMarcas />} />
                      </Route>
                      <Route path="productos">
                        <Route index element={<Productos />} />
                        <Route path="crear" element={<FormProductos />} />
                        <Route path="editar/:id" element={<FormProductos />} />
                        <Route path="editar" element={<Navigate to="../" />} />
                        <Route
                          path="detalle/:id"
                          element={<DetalleProducto />}
                        />
                        <Route path="detalle" element={<Navigate to="../" />} />
                      </Route>

                      {/* <Route path='parametros' element={<Navigate to='../' />} /> */}
                      {/* <Route path="parametros/categorias">
                    <Route index element={<Categorias />} />
                    <Route path=':id' element={<FormCategorias />} />
                  </Route> */}
                      {/* <Route path="parametros/subcategorias">
                    <Route index element={<Subcategorias />} />
                    <Route path=':id' element={<FormSubcategorias />} />
                  </Route> */}
                      {/* <Route path="parametros/marcas">
                    <Route index element={<Marcas />} />
                    <Route path=':id' element={<FormMarcas />} />
                  </Route> */}
                      {/* <Route path="parametros/modelos">
                    <Route index element={<Modelos />} />
                    <Route path=':id' element={<FormModelos />} />
                  </Route> */}
                    </>
                  )
                }
              </Route>
              <Route path="*" element={<Page404 />} />
            </>
          )
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
      <Rutas />
    </SessionProvider>
  )
}

export default Routing
