import Swal2 from '../../components/SweetAlert2'
import { SessionContext } from '../../contexts/SessionProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchCallBack from '../../helpers/fetchCallBack'

const SwalError = Swal2.mixin({
  icon: 'error',
  timer: 2000,
  showConfirmButton: false
})

const useFetchCallBack = () => {
  const dispatch = useContext(SessionContext)[1]
  const navigate = useNavigate()

  return async (url, content, callback = null) => {
    const complete_content = {
      headers: {
        'Content-Type': 'application/json',
        ...content.headers
      },
      mode: 'cors',
      method: 'GET',
      ...content
    }

    try {
      const response = await fetchCallBack(url, complete_content, callback)

      // En caso de que no este logueado
      if (response.status === 401) {
        await SwalError.fire({
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
