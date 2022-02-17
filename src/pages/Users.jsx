import React from 'react'
import UserItem from '../components/UserItem'
import UserList from '../components/UserList'
import ButtonIcon from '../components/ButtonIcon'
import { Link } from 'react-router-dom'

const Users = () => {
  return (
    <>
      <Link to='/usuarios/crear'>
        <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'}>
          Agregar
        </ButtonIcon>
      </Link>

      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Usuarios</h2>
        </div>
        <div className="card-body">
          <UserList>
            <UserItem name={'Hector Valdez'} rol={'Admin'} />
            <UserItem name={'Gabriel Gonzalez'} rol={'Empleado'} />
            <UserItem name={'Elver Galarga'} rol={'Empleado'} />
          </UserList>
        </div>
      </div>
    </>
  )
}

export default Users
