import { useState, useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import Swal2 from '../components/SweetAlert2'

const useDeleteUser = () => {
  const [valorFinal, setValorFinal] = useState(null)
  const session = useContext(SessionContext)[0]

  const deleteUser = (id) => {
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: 'DELETE',
      body: JSON.stringify({ id })
    }
    Swal2.fire({
      title: '¿Está seguro de eliminar el usuario?',
      showDenyButton: false,
      confirmButtonColor: '#E11D48',
      showCancelButton: true,
      confirmButtonText: 'ELIMINAR'
    }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await fetch('http://127.0.0.1:4000/usuarios', request)
          const json = await response.json()
          console.log(json)
          setValorFinal(id)
        } catch (error) {
          setValorFinal(null)
        }
      } else if (result.isDenied) {
      // sexo//
      }
    })
  }

  return [valorFinal, deleteUser]
}

export default useDeleteUser

// const [valor,funcion] = useDeleteUser()
// funcion(1)
// valor
