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
      <svg className="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
      Logout
    </button>
  )
}

export default LogoutButton
