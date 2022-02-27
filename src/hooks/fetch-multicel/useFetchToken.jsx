import { useContext } from 'react'
import { SessionContext } from '../../contexts/SessionProvider'
import { useNavigate } from 'react-router-dom'
import useFetchCallBack from './useFetchCallBack'

const useFetchToken = () => {
  const session = useContext(SessionContext)[0]
  const navigate = useNavigate()
  const fetchCallback = useFetchCallBack()

  return (url, content = {}, callback) => {
    if (session) {
      const token_content = {
        headers: {
          'auth-token': session.token,
          ...content.headers
        },
        ...content
      }
      return fetchCallback(url, token_content, callback)
    } else {
      navigate('/login')
      throw new Error('No existe una session')
    }
  }
}

export default useFetchToken
