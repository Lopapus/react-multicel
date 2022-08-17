import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Server from '../../../../services/Server'
import ButtonIcon from '../../../../components/ButtonIcon'
import { useSetForm } from '../../../../hooks'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import InputRegex from '../../../../components/InputRegex'
import AlertCollapse from '../../../../components/AlertCollapse'
import CategoriaSchema from '../../Parametros/schemas/CategoriaSchema'

const ModalSubcategorias = ({ show, handleShow }) => {
  const [data, setData] = useState()
  const [form, setForm, setDataForm] = useSetForm()
  const [alerts, setAlerts] = useState({})
  const [listAlerts, setListAlerts] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState('')

  const fetchToken = useFetchToken()
  const params = useParams()

  const handleFindCategoria = async () => {
    try {
      if (params.id === 'crear' || params.id == null) {
        setData({})
        setLoading(false)
        setMethod('POST')
      } else {
        setLoading(true)
        const response = await fetchToken(`${Server}/subcategorias/${params.id}`)
        setLoading(false)
        setDataForm(response.syncJson())
        setData(response.syncJson())
        setMethod('PUT')
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSetErrors = (list) => {
    setDisabled(true)
    const new_errors = {}
    list.forEach(
      ({ path, message }) => { new_errors[path] = { message, show: true } }
    )
    setAlerts(new_errors)
  }

  // Al enviar los datos muestra las alertas
  const handleUploadCategoria = async () => {
    if (JSON.stringify(form) !== JSON.stringify(data)) {
      const content = {
        method,
        body: JSON.stringify(form)
      }

      setLoading(true)
      const response = await fetchToken(`${Server}/subcategorias`, content)
      setLoading(false)

      if (response.ok) {
        const { message } = response.syncJson()
        if (method === 'POST') {
          setDataForm({})
          setData({})
        } else {
          setData({ ...form })
        }
        setAlerts({ general: { message, show: true, type: 'success' } })
      } else {
        handleSetErrors(response.syncJson())
      }
    } else {
      setAlerts({
        general: {
          message: (
            (method === 'POST') ? 'Los datos ingresados ya se guardaron anteriormente' : 'Primero debe realizar alguna modificación'
          ),
          show: true,
          type: 'warning'
        }
      })
      setDisabled(true)
    }
  }

  // Valida los datos del formulario
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      await CategoriaSchema.validate(form, { abortEarly: false })
      handleUploadCategoria()
    } catch (errors) {
      if (errors?.inner) {
        handleSetErrors(errors.inner)
      }
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

  const handleCheckAlerts = () => {
    if (listAlerts.length > 0) {
      if (!disabled) {
        setDisabled(true)
      }
    } else {
      if (disabled) {
        setDisabled(false)
      }
    }
  }

  const handleHideAlert = () => {
    if (alerts?.general) {
      const replace = { ...alerts }
      replace.general.show = false
      setAlerts(replace)
    }
  }

  const handleSetListAlerts = () => {
    const new_list = Object.keys(alerts).filter(key => alerts[key].show === true)
    setListAlerts(new_list)
  }

  useEffect(handleFindCategoria, [])
  useEffect(handleCheckAlerts, [listAlerts])
  useEffect(handleSetListAlerts, [alerts])
  useEffect(handleHideAlert, [form])

  return (
     <Modal show={show}>
      <Modal.Header>
        <h2 className="fs-5 fw-bold mb-0">Nueva subcategoría</h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitForm} className='mx-5'>
            <div className='row'>
              <div className='form-group col-12 justify-content-center'>
                <label>Nombre (requerido)</label>
                <InputRegex
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={form?.nombre || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[A-z\s])*$/gm}
                  required
                />
                <AlertCollapse message={alerts?.nombre?.message} show={alerts?.nombre?.show} />
              </div>
            </div>

            <div className='form-group my-3 d-flex justify-content-center'>
              <ButtonIcon btncolor='btn-primary mx-3' iconclass={'fas fa-save'} disabled={disabled || loading} >
                {
                  !loading
                    ? (method === 'POST' ? 'Agregar' : 'Modificar')
                    : (method === 'POST' ? 'Agregando...' : 'Modificando...')
                }
              </ButtonIcon>
              <button className='btn btn-secondary mx-3' onClick={() => handleShow(false)}>Cerrar</button>
            </div>
            <AlertCollapse message={alerts?.general?.message} show={alerts?.general?.show} type={alerts?.general?.type} />
          </form>
      </Modal.Body>
     </Modal>
  )
}

export default ModalSubcategorias
