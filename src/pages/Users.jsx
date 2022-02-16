import React from 'react'
import UserItem from '../components/UserItem'
import UserList from '../components/UserList'
import ButtonIcon from '../components/ButtonIcon'
import CardComponent from '../layouts/Card/CardComponent'

const Users = () => {
  return (
    <>
      <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'}>
        Agregar
      </ButtonIcon>

      {/* <h2 className="fs-5 fw-bold mb-0">Usuarios</h2> */}
      <CardComponent title={'Usuarios'}>
        <UserList>
          <UserItem name={'Hector Valdez'} rol={'Admin'} />
          <UserItem name={'Gabriel Gonzalez/s'} rol={'Empleado'} />
          <UserItem name={'Elver Galarga'} rol={'Empleado'} />
        </UserList>
      </CardComponent>
    </>
  )
}

export default Users
