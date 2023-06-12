import Swal2 from '../../../../components/SweetAlert2'
import Server from '../../../../services/Server'
import { useFetchToken } from '../../../../hooks/fetch-multicel'

const useDeleteOferta = () => {
  const fetchToken = useFetchToken()

  const deleteOferta = async ({ id, nombre }) => {
    const content = {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }

    const result = await Swal2.fire({
      title: `¿Está seguro de eliminar la oferta "${nombre}"?`,
      showDenyButton: false,
      confirmButtonColor: '#E11D48',
      timer: 5000,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    })

    if (result.isConfirmed) {
      try {
        const response = await fetchToken(`${Server}/tipos_ofertas`, content)

        if (!response.ok) {
          Swal2.fire({
            icon: 'error',
            title: `${response?.syncJson()?.message || 'Ocurrió un fallo, vuelva a intentarlo'}`,
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

  return deleteOferta
}

export default useDeleteOferta
