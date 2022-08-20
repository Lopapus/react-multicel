import React from 'react'
import { Card } from 'react-bootstrap'
import img_usuario from '../../../../images/sistema/usuario.png'
import parseCuit from '../../../../helpers/parseCuit'

const CardProveedor = ({ data }) => {
  return (
    <Card className="animate__animated animate__fadeInLeft mb-4">
      <Card.Body>
        <div>
            <div className="row gy-2">
              <div className="col-12 col-md-auto d-flex justify-content-center align-items-center">
                <img className="" src={img_usuario} width={90} height={90} />
              </div>
              <div className="col-12 col-md-10">
                <div className="text-start">
                  <p className="h6 text-center text-md-start fw-bolder">{data.nombre}</p>
                  <hr className='my-2' />
                  <div className="row">
                    <p className="col-12 col-md-6 mb-1">cuit: {parseCuit(data.cuit)}</p>
                    <p className="col-12 col-md-6 mb-1">telefono: {data.telefono}</p>
                    <p className="col-12 col-md-6 mb-1">correo: {data.correo}</p>
                    <p className="col-12 text-info mb-1">{data.inscripto ? 'Inscripto en AFIP' : 'No iscripto en AFIP'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Card.Body>
    </Card>
  )
}

export default CardProveedor
