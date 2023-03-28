import React, { useEffect, useState } from 'react'
import CardComponent from '../../../../layouts/Card/CardComponent'
import InputRegex from '../../../../components/InputRegex'
import AlertCollapse from '../../../../components/AlertCollapse'
import { useSetForm } from '../../../../hooks'
import OfertasModalContext from '../contexts/OfertasModalContext'
import DataList from '../../../../components/DataList'
import ItemProducto from '../components/ItemProducto'

const FormOfertas = () => {
  const [form, setForm] = useSetForm({})
  const [alerts, setAlerts] = useState({})
  const productos = [
    { modelo: 'LGTV', precio: 20000, descuento: 50 }
  ]

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

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <CardComponent >
      <form className='row g-3'>
        <div className='form-group col-12 col-sm-6'>
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

        <div className='form-group col-12 col-sm-6'>
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

        <div className='form-group col-12'>
          <label>Productos</label>
          <OfertasModalContext.Provider>
            <DataList list={productos} component={ItemProducto} />
          </OfertasModalContext.Provider>
        </div>
      </form>
    </CardComponent>
  )
}

export default FormOfertas
