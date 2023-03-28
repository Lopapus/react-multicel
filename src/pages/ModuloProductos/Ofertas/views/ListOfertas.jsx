import React from 'react'
import CardComponent from '../../../../layouts/Card/CardComponent'
import DataList from '../../../../components/DataList'
import ButtonIcon from '../../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const ListOfertas = () => {
  const ofertas = []
  const navigate = useNavigate()

  return (
    <>
      <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'} handler={() => navigate('crear')}>
        Agregar
      </ButtonIcon>
      <CardComponent title='Ofertas' >
        <DataList list={ofertas} />
      </CardComponent>
    </>
  )
}

export default ListOfertas
