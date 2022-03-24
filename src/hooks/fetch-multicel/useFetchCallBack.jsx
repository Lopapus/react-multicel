import Swal2 from '../../components/SweetAlert2'
import { SessionContext } from '../../contexts/SessionProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const SwalError = Swal2.mixin({
  icon: 'error',
  showConfirmButton: false
})

const useFetchCallBack = () => {
  const dispatch = useContext(SessionContext)[1]
  const navigate = useNavigate()

  return async (url, content, callback = null) => {
    const complete_content = {
      mode: 'cors',
      method: 'GET',
      ...content,
      headers: {
        ...content.headers,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(url, complete_content)
      const json = await response.json()
      response.json = json

      // en caso de que cuente con un callback
      if (callback) {
        callback(response)
      }

      // En caso de que no este logueado
      if (response?.status === 401) {
        await SwalError.fire({
          timer: 2000,
          title: <p className='h3 text-danger'>{response.json.msg}</p>
        })
        dispatch({ type: 'logout' })
        navigate('login')
      }

      return response
    } catch (error) {
      SwalError.fire({
        title: <p className='h3 text-danger'>Error al conectar con el servidor</p>
      })
      throw error
    }
  }
}

export default useFetchCallBack
