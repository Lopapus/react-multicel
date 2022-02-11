import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Home, Login } from './pages'
import Workspace from './layouts/Admin/Workspace'
// import DashboardProvider from './contexts/DashboardProvider'

const Routing = () => {
  return (
    <Router>
      <Routes>
          {/* <DashboardProvider >  */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Workspace />} >
              <Route path="dashboard">
                <Route index element={<Home />} />
                <Route path=":page" element={<Home />} />
              </Route>
              <Route path="template" />
              <Route path=":page" element={<Home />} />
              <Route path=":page/:page" element={<Home />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default Routing
