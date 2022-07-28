import Swal2 from '../../../../components/SweetAlert2'
import Server from '../../../../services/Server'
import { useFetchToken } from '../../../../hooks/fetch-multicel'

const useDeleteSubcategoria = () => {
  const fetchToken = useFetchToken()

  const deleteSubcategoria = async ({ id, nombre }) => {
    const content = {
      method: 'DELETE',
      body: JSON.stringify({ id })
    }

    const result = await Swal2.fire({
      title: `¿Está seguro de eliminar la subcategoría "${nombre}"?`,
      showDenyButton: false,
      confirmButtonColor: '#E11D48',
      timer: 5000,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    })

    if (result.isConfirmed) {
      try {
        const response = await fetchToken(`${Server}/subcategorias`, content)

        if (!response.ok) {
          Swal2.fire({
            icon: 'error',
            title: `${response?.syncJson()?.message || 'Ocurrio un fallo vuelva a intentarlo'}`,
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

  return deleteSubcategoria
}

export default useDeleteSubcategoria
