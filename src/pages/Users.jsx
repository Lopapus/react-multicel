import { useState, useEffect } from 'react'
import UserItem from '../components/UserItem'
import UserList from '../components/UserList'
import ButtonIcon from '../components/ButtonIcon'
import CardComponent from '../layouts/Card/CardComponent'
import { Link } from 'react-router-dom'

const Users = () => {
  const [stateUsers, setStateUsers] = useState([])

  const handleFetch = async () => {
    try {
      const peticion = await fetch('http://localhost:4000/usuarios')
      const res = await peticion.json()
      // console.log(res)
      setStateUsers(res)
    } catch (error) {
      console.log(error)
    }
  }

  // const handleDelete(){
  // stateUsers.find()
  // }

  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <>
      <Link to='/usuarios/crear'>
        <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'}>
          Agregar
        </ButtonIcon>
      </Link>
      {/* <h2 className="fs-5 fw-bold mb-0">Usuarios</h2> */}
      <CardComponent title={'Usuarios'}>
        <UserList>
          {
            stateUsers.length > 0 &&
            stateUsers.map(
              (user, key) =>
              <UserItem key={'usuario-' + key} name={user.usuario} rol={user.rol} id={user.id} />
            )
          }
        </UserList>
      </CardComponent>
    </>
  )
}

export default Users
