import React, { useEffect, useState } from 'react'
import CardComponent from '../../../../layouts/Card/CardComponent'
import InputRegex from '../../../../components/InputRegex'
import AlertCollapse from '../../../../components/AlertCollapse'
import { useSetForm } from '../../../../hooks'
// import OfertasModalContext from '../contexts/OfertasModalContext'
import ItemProducto from '../components/ItemProducto'
import ModalProductos from '../components/ModalProductos'
import OfertasModalContext from '../contexts/OfertasModalContext'
import DataTable from '../../../../components/DataTable'

const FormOfertas = () => {
  const [productos, setProductos] = useState(null)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useSetForm({})
  const [alerts, setAlerts] = useState({})

  const listProductos = productos ? productos.filter(producto => producto.checked) : []

  const handleSetForm = (e) => {
    const { name } = e.target
    if (alerts[name]) {
      const { message, show } = alerts[name]
      if (show) {
        setAlerts({ ...alerts, [name]: { message, show: false } })
      }
    }
    setForm(e)
  }

  const handleCheckProducto = (position) => {
    const update = [...productos]
    update[position].checked = !update[position].checked
    setProductos(update)
  }

  const handleUpdateDescuento = (position, descuento) => {
    const update = [...productos]
    update[position].descuento = descuento
    update[position].precio = parseInt(update[position].precio_real - (update[position].precio_real * (descuento / 100)))
    setProductos(update)
  }

  const context = {
    productos,
    setProductos,
    checkProducto: handleCheckProducto,
    updateDescuento: handleUpdateDescuento,
    modal: { show: modal, setShow: setModal }
  }

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <CardComponent >
      <form className='row g-3'>
        <div className='form-group col-12 col-sm-8 col-md-9 col-lg-9 col-xl-10'>
          <label>Descripción</label>
          <InputRegex
            type="text"
            name="descripcion"
            id="descripcion"
            value={form?.descripcion || ''}
            className='form-control'
            onChange={handleSetForm}
            regex={/^(?:[A-z\s])*$/gm}
            required
          />
          <AlertCollapse message={alerts?.descripcion?.message} show={alerts?.descripcion?.show} />
        </div>

        <div className='form-group col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2'>
          <label>Precio de oferta</label>
          <InputRegex
            type="text"
            name="precio_oferta"
            id="precio_oferta"
            value={form?.precio_oferta || ''}
            className='form-control'
            onChange={handleSetForm}
            regex={/^(?:[0-9])*$/gm}
            required
          />
          <AlertCollapse message={alerts?.precio_oferta?.message} show={alerts?.precio_oferta?.show} />
        </div>

        <OfertasModalContext.Provider value={context}>
          <div>
            <button className='btn btn-primary' type='button' onClick={() => setModal(true)} >Productos</button>

            <ModalProductos setShow={setModal} show={modal} />
          </div>

          {
            listProductos.length > 0 &&
            <div className='form-group col-12'>
              <label>Productos</label>
              {
                productos &&
                <DataTable list={listProductos} component={ItemProducto} filter={['label']} tableClass="table-hover" header={['Producto', 'Descuento', 'Precio', 'Con descuento']} />
              }
            </div>
          }
        </OfertasModalContext.Provider>
      </form>
    </CardComponent>
  )
}

export default FormOfertas
