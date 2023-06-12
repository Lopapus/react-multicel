import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionProvider'

const LogoutButton = ({ className }) => {
  const dispatch = useContext(SessionContext)[1]
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      dispatch({ type: 'logout' })
      navigate('login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      <span className="dropdown-icon text-danger">
        <i className="fa-solid fa-door-open"></i>
      </span>
      Salir
    </button>
  )
}

export default LogoutButton
