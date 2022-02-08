import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Home } from './pages'
import Workspace from './layouts/Admin/Workspace'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Workspace />} >
          <Route path="dashboard" element={<Home />} />
          <Route path="template" />
          <Route path=":page" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routing
