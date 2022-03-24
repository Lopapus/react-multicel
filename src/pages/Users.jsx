import { useState, useEffect, useContext } from 'react'
import UserItem from '../components/UserItem'
import UserList from '../components/UserList'
import ButtonIcon from '../components/ButtonIcon'
import CardComponent from '../layouts/Card/CardComponent'
import { Link } from 'react-router-dom'
import useDeleteUser from '../hooks/useDeleteUser'
import host from '../host'
import Loader from '../components/Loader'
import { SessionContext } from '../contexts/SessionProvider'

const Users = () => {
  const [resultado, setDelete] = useDeleteUser()
  const [stateUsers, setStateUsers] = useState([])

  const session = useContext(SessionContext)[0]

  const handleFetch = async () => {
    try {
      const peticion = await fetch(`${host}/usuarios`)
      const res = await peticion.json()
      const list = res.filter(element => element.usuario !== session.usuario)
      setStateUsers(list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])
  useEffect(() => {
    if (resultado) {
      const listUsers = stateUsers.filter(element => element.id !== resultado)
      setStateUsers(listUsers)
    }
  }, [resultado])
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
            stateUsers.length > 0
              ? stateUsers.map(
                (user, key) =>
                  <UserItem key={'usuario-' + key} name={user.usuario} rol={user.rol} id={user.usuario} onDelete={() => setDelete(user.id)} />
              )
              : <Loader />
          }
        </UserList>
      </CardComponent>
    </>
  )
}

export default Users
