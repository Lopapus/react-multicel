import ButtonIcon from './ButtonIcon'
import { SessionContext } from '../contexts/SessionProvider'
import { useContext } from 'react'
import Swal2 from './SweetAlert2'

const UserItem = ({ name, rol, id }) => {
  const session = useContext(SessionContext)[0]

  const handleDelete = async () => {
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
        } catch (error) {
          // setShowAlert({ message: 'Error', style: 'col-2 alert alert-danger' })
        }
      } else if (result.isDenied) {
        // sexo//
      }
    })
  }

  return (
    <li className="list-group-item px-0 border-bottom">
      <div className="row align-items-center">
        <div className="col-auto">
          {/* <!-- Avatar --> */}
          <span className="avatar">
            <img className="rounded" alt="Image placeholder" src="https://www.getbillage.com/files/user/avatar/_usuario.png" />
          </span>
        </div>
        <div className="col-auto ms--2">
          <h4 className="h6 mb-0">
            {name}
          </h4>
          <div className="d-flex align-items-center text-info">
            <small>{rol}</small>
          </div>
        </div>
        <div className="col d-flex flex-row justify-content-end">

          <div className='w-auto d-grid gap-2 d-flex'>
            <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-pencil'} />
            <ButtonIcon btncolor={'btn-danger'} btnsize={'btn-sm'} iconclass={'fa-solid fa-trash'} handler={handleDelete} />
          </div>

        </div>
      </div>
    </li>
  )
}

export default UserItem
