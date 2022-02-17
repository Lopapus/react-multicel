import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Home, Login, Page404, Users, CreateUsers } from './pages'
import Workspace from './layouts/Admin/Workspace'

// import DashboardProvider from './contexts/DashboardProvider'

const Routing = () => {
  return (
    <Router>
      <Routes>
          {/* <DashboardProvider >  */}
          <Route path="/login" element={<Login />} />
          <Route path="/denied" element={<Page404 />} />
          <Route path="/" element={<Workspace />} >
              <Route path="dashboard">
                <Route index element={<Home />} />
                <Route path=":page" element={<Home />} />
              </Route>
              <Route path="usuarios">
                <Route index element={<Users />} />
                <Route path='crear' element={<CreateUsers />}/>
              </Route>
              <Route path="template" />
              <Route path=":page" element={<Home />} />
              <Route path=":page/:page" element={<Home />} />
              <Route path="*" element={<Home />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default Routing
