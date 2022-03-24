import Swal2 from '../components/SweetAlert2'
import Server from '../services/Server'
import { useFetchToken } from './fetch-multicel'

const useDeleteUser = () => {
  const fetchToken = useFetchToken()

  const deleteUser = async ({ id, usuario }) => {
    const content = {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }

    const result = await Swal2.fire({
      title: `¿Está seguro de eliminar el usuario ${usuario}?`,
      showDenyButton: false,
      confirmButtonColor: '#E11D48',
      timer: 5000,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    })

    if (result.isConfirmed) {
      try {
        const response = await fetchToken(`${Server}/usuarios`, content)

        if (!response.ok) {
          Swal2.fire({
            icon: 'error',
            title: `${response?.json?.msg || 'Ocurrio un fallo vuelva a intentarlo'}`,
            showDenyButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2000
          })
        }

        return response.ok
      } catch (error) {
        return null
      }
    }
    return null
  }

  return deleteUser
}

export default useDeleteUser
