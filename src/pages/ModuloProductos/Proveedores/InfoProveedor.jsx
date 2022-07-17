import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import parseCuit from '../../../helpers/parseCuit'
import CardComponent from '../../../layouts/Card/CardComponent'

const InfoProveedor = () => {
  const location = useLocation()
  const data = location.state

  return (
    <CardComponent title={`Información de "${data.nombre}"`}>
      <div className='form-group'>
        {/* <h4>Nombre: {data.nombre}</h4> */}
        <h6>Cuit: { parseCuit(data.cuit)}</h6>
        <h6>Telefono: {data.telefono}</h6>
        <h6>Correo: {data.correo}</h6>
        <h6>
          {
            data.inscripto
              ? <span className='text-success'>Inscripto</span>
              : <span className='text-danger'>No inscripto</span>
          }
        </h6>
      </div>
      <div className='form-group'>
        <Link to={'../'}>
          <button className='btn btn-warning mt-2'>Volver</button>
        </Link>
      </div>
    </CardComponent>
  )
}

export default InfoProveedor
