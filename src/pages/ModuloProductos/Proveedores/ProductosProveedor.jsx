import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchToken from '../../../hooks/fetch-multicel/useFetchToken'
// import CardComponent from '../../../layouts/Card/CardComponent'
import Server from '../../../services/Server'
import img_usuario from '../../../images/sistema/usuario.png'
import parseCuit from '../../../helpers/parseCuit'
import Loader from '../../../components/Loader'
import ButtonIcon from '../../../components/ButtonIcon'
import { Card } from 'react-bootstrap'
import ModalProveedor from './components/ModalProveedor'
import DataList from '../../../components/DataList'
import ProductoItem from './components/ProductoItem'

const ProductosProveedor = () => {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  const fetchToken = useFetchToken()

  const productos = [
    {
      modelo: 'A21',
      precio: 15000,
      observaciones: '',
      stock: 5,
      stock_min: 5,
      imei: null,
      estado: true,
      fecha_ingreso: '12-02-2002',
      codigo_barras: '123120044232312',
      categoria: { nombre: 'Dispositivo' },
      subcategoria: { nombre: 'Celular' },
      marca: { nombre: 'Samsung' },
      proveedor: { nombre: 'Hector', id: 5 }
    }
  ]

  const handleGetProveedor = async () => {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}?productos=1`)
      const res_data = response.syncJson()
      // console.log(res_data)
      setData(res_data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(handleGetProveedor, [])

  return (
    data?.nombre
      ? <div>
          <ModalProveedor show={showModal} handleShow={setShowModal} items={productos}/>
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
          <Card className='animate__animated animate__fadeIn'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <h5 className='m-0'>Productos</h5>
              <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-box'} handler={() => setShowModal(true)}>Agregar</ButtonIcon>
            </Card.Header>
            <Card.Body>
              <DataList list={productos} component={ProductoItem} filter={['modelo']} />
              {/* <img src="https://memegenerator.net/img/instances/85594412/aqu-pondra-mis-productos-si-tuvera-stock.jpg" alt="" /> */}
              {/* <h5>Aqui irian los productos</h5> */}
            </Card.Body>
            <Card.Footer className='d-flex justify-content-end'>
              <ButtonIcon btncolor={'btn-secondary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-cart-flatbed'} >Reponer Stock</ButtonIcon>
            </Card.Footer>
          </Card>
        </div>
      : <Loader />

  )
}

export default ProductosProveedor
