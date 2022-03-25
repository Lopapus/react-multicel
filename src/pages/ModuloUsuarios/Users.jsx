import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserItem from '../../components/UserItem'
import UserList from '../../components/UserList'
import ButtonIcon from '../../components/ButtonIcon'
import CardComponent from '../../layouts/Card/CardComponent'
import useDeleteUser from '../../hooks/useDeleteUser'
import { useFetchToken } from '../../hooks/fetch-multicel'
import Server from '../../services/Server'
import Loader from '../../components/Loader'
import { SessionContext } from '../../contexts/SessionProvider'

const Users = () => {
  const deleteUser = useDeleteUser()
  const fetchToken = useFetchToken()
  const [stateUsers, setStateUsers] = useState([])
  const [message, setMessage] = useState(<Loader />)

  const session = useContext(SessionContext)[0]

  const handleFetch = async () => {
    try {
      const peticion = await fetchToken(`${Server}/usuarios`)
      const res = peticion.json
      const list = res.filter(element => element.usuario !== session.usuario)
      if (list.length === 0) {
        setMessage(<h5 className="text-center">Aun no hay usuarios</h5>)
      }
      setStateUsers(list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(handleFetch, [])

  const handleDeleteUser = async (user) => {
    const result = await deleteUser(user)
    if (result) {
      const newList = [...stateUsers].filter(
        element => element.id !== user.id
      )
      setStateUsers([...newList])
    }
  }

  return (
    <>
      <Link to='/usuarios/crear'>
        <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'}>
          Agregar
        </ButtonIcon>
      </Link>
      <CardComponent title={'Usuarios'}>
        <UserList>
          {
            stateUsers.length > 0
              ? stateUsers.map(
                (user, key) =>
                  <UserItem key={'usuario-' + key} name={user.usuario} rol={user.rol} id={user.usuario} onDelete={() => handleDeleteUser(user)} />
              )
              : message
          }
        </UserList>
      </CardComponent>
    </>
  )
}

export default Users
