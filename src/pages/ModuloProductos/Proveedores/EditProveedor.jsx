import React, { useEffect, useState } from 'react'
import { useSetForm } from '../../../hooks'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import Server from '../../../services/Server'
import InputRegex from './components/InputRegex'
import proveedorSchema from './schemas/ProveedorSchema'
import AlertCollapse from './components/AlertCollapse'

const EditProveedor = () => {
  const [data, setData] = useState()
  const [alerts, setAlerts] = useState({})
  const [form, setForm, setDataForm] = useSetForm()
  const fetchToken = useFetchToken()
  const params = useParams()
  const navigate = useNavigate()

  const handleFindProveedor = async () => {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}`)
      setDataForm(response.syncJson())
      setData(response.syncJson())
    } catch (error) {
      console.log('error al buscar')
    }
  }

  const handleUploadProveedor = async () => {
    if (JSON.stringify(form) !== JSON.stringify(data)) {
      const content = {
        method: 'PUT',
        body: JSON.stringify(form)
      }
      const response = await fetchToken(`${Server}/proveedores`, content)
      if (response.ok) {
        const { message } = response.syncJson()
        setAlerts({ general: { message, show: true, type: 'success' } })
      } else {
        const query_errors = {}
        response.syncJson().forEach(
          ({ path, message }) => {
            query_errors[path] = { message, show: true }
          }
        )
        setAlerts(query_errors)
      }
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      await proveedorSchema.validate(form)
      handleUploadProveedor()
    } catch (error) {
      const { path, message } = error
      setAlerts({ [path]: { message, show: true } })
    }
  }

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

  const handleHideAlert = () => {
    if (alerts?.general) {
      const replace = { ...alerts }
      replace.general.show = false
      setAlerts(replace)
    }
  }

  useEffect(handleFindProveedor, [])
  useEffect(handleHideAlert, [form])

  return (
    data?.nombre
      ? <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Proveedor</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className='row g-3'>

              <div className='form-group col-12 col-sm-6'>
                <label>Nombre (requerido)</label>
                <InputRegex type="text" name="nombre" id="nombre" value={form?.nombre || ''} className='form-control' onChange={handleSetForm} regex={/^(?:[A-z\s])*$/gm} required />
                <AlertCollapse message={alerts?.nombre?.message} show={alerts?.nombre?.show} />
              </div>

              <div className='form-group col-12 col-sm-6'>
                <label>Cuit (requerido)</label>
                <InputRegex type="text" name="cuit" id="cuit" value={form?.cuit || ''} className='form-control' onChange={handleSetForm} regex={/^(?:[0-9])*$/gm} maxLength={11} required />
                <AlertCollapse message={alerts?.cuit?.message} show={alerts?.cuit?.show} />
              </div>

              <div className='form-group col-12 col-sm-6'>
                <label>Correo</label>
                <input type="email" name="correo" id="correo" value={form?.correo || ''} className='form-control' onChange={handleSetForm} ></input>
                <AlertCollapse message={alerts?.correo?.message} show={alerts?.correo?.show} />
              </div>

              <div className='form-group col-12 col-sm-6 col-md-3'>
                <label>Telefono</label>
                <InputRegex type="tel" name="telefono" id="telefono" value={form?.telefono || ''} className='form-control' onChange={handleSetForm} regex={/^(?:[0-9+\s])*$/gm} />
                <AlertCollapse message={alerts?.telefono?.message} show={alerts?.telefono?.show} />
              </div>

              <div className='form-group col-12 col-sm-6 col-md-3'>
                <label>AFIP</label>
                <select defaultValue={form?.inscripto} name="inscripto" id="inscripto" className='form-select' onChange={handleSetForm}>
                  <option value="true">Inscripto</option>
                  <option value="false">No inscripto</option>
                </select>
                <AlertCollapse message={alerts?.inscripto?.message} show={alerts?.inscripto?.show} />
              </div>

              <div className='form-group col-12'>
                <label>Ubicación</label>
                <textarea name="lugar" id="lugar" defaultValue={data?.lugar} className='form-control' onChange={handleSetForm} cols="30" rows="3"></textarea>
                <AlertCollapse message={alerts?.lugar?.message} show={alerts?.lugar?.show} />
              </div>

            </div>
            <div className='form-group my-3 d-flex justify-content-center justify-content-sm-start'>
              <ButtonIcon type="button" btncolor='btn-secondary me-1' iconclass={'fas fa-arrow-left'} handler={() => navigate('/proveedores')} >Volver</ButtonIcon>
              <ButtonIcon btncolor='btn-primary ms-1' iconclass={'fas fa-save'} >Modificar</ButtonIcon>
            </div>
            <AlertCollapse message={alerts?.general?.message} show={alerts?.general?.show} type={alerts?.general?.type} />
          </form>
        </div >
      </div >
      : <div>No hay nada</div>
  )
}

export default EditProveedor
