import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Home } from './pages'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Pagina /</div>} />
        <Route path="/" >
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routing
