import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Loader from '../../../components/Loader'
import Server from '../../../services/Server'
import ButtonIcon from '../../../components/ButtonIcon'
import { useSetForm } from '../../../hooks'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import InputRegex from '../../../components/InputRegex'
import AlertCollapse from '../../../components/AlertCollapse'
import ProductoSchema from './schemas/ProductoSchema'
// import FormCategorias from '../Parametros/FormCategorias'

const FormProductoss = () => {
  const [data, setData] = useState()
  const [form, setForm, setDataForm] = useSetForm()
  const [alerts, setAlerts] = useState({})
  const [listAlerts, setListAlerts] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState('')
  const [categorias, setCategorias] = useState({})
  const [subcategorias, setSubcategorias] = useState({})
  const [marcas, setMarcas] = useState({})

  const fetchToken = useFetchToken()
  const params = useParams()
  const navigate = useNavigate()

  const handleFindCategorias = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/categorias`)
    setLoading(false)
    setCategorias(response.syncJson)
  }

  const handleFindSubcategorias = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/subcategorias`)
    setLoading(false)
    setSubcategorias(response.syncJson)
  }

  const handleFindMarcas = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/marcas`)
    setLoading(false)
    setMarcas(response.syncJson)
  }

  const handleFindProducto = async () => {
    try {
      if (params.id === 'crear' || params.id == null) {
        setData({})
        setLoading(false)
        setMethod('POST')
      } else {
        setLoading(true)
        const response = await fetchToken(`${Server}/productos/${params.id}`)
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
  const handleUploadProducto = async () => {
    if (JSON.stringify(form) !== JSON.stringify(data)) {
      const content = {
        method,
        body: JSON.stringify(form)
      }

      setLoading(true)
      const response = await fetchToken(`${Server}/productos`, content)
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
      await ProductoSchema.validate(form, { abortEarly: false })
      handleUploadProducto()
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

  console.log(form)

  useEffect(handleFindCategorias, [])
  useEffect(handleFindSubcategorias, [])
  useEffect(handleFindMarcas, [])
  useEffect(handleFindProducto, [])
  useEffect(handleCheckAlerts, [listAlerts])
  useEffect(handleSetListAlerts, [alerts])
  useEffect(handleHideAlert, [form])
  return (
    data
      ? <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Producto</h2>
        </div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#categoriasModal">
          ADD CATEG
        </button>
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className='row g-3'>

              <div className='form-group col-12 col-sm-6 col-md-4'>
                <label>Modelo</label>
                <InputRegex
                  type="text"
                  name="modelo"
                  id="nombre"
                  value={form?.modelo || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[A-z\s])*$/gm}
                  required
                />
                <AlertCollapse message={alerts?.nombre?.message} show={alerts?.nombre?.show} />
              </div>

              <div className='form-group col-12 col-sm-6 col-md-4'>
                <label>Precio</label>
                <InputRegex
                  type="number"
                  name="precio"
                  id="precio"
                  defaultValue={form?.modelo || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  required
                />
                <AlertCollapse message={alerts?.nombre?.message} show={alerts?.nombre?.show} />
              </div>

              <div className='form-group col-12 col-sm-6 col-md-4'>
                <label>Facturable</label>
                <select defaultValue={form?.facturado || '-'} name="facturado" id="facturado" className='form-control' onChange={handleSetForm}>
                  <option value="-" className='form-control' disabled> - Seleccione - </option>
                  <option value="1" className="form-control">Si</option>
                  <option value="2" className="form-control">No</option>
                </select>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Stock</label>
                <InputRegex
                  type="number"
                  name="stock"
                  id="stock"
                  defaultValue={form?.stock || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  required
                />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Stock mínimo</label>
                <InputRegex
                  type="number"
                  name="stock_min"
                  id="stock_min"
                  defaultValue={form?.stock_min || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  required
                />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>imei</label>
                <InputRegex
                  type="number"
                  name="imei"
                  id="imei"
                  defaultValue={form?.imei || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  maxLength={15}
                />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Categoria</label>
                <select className='form-control' name="id_categoria" id="id_categoria" defaultValue={form?.id_categoria || '-'} onChange={handleSetForm} required>
                  <option value='-' disabled> - Seleccione - </option>
                  {
                    categorias.length > 0
                      ? categorias.map(
                        (categoria, key) =>
                          <option key={'cat-' + key} value={categoria.id}>{ categoria.nombre}</option>
                      )
                      : <option value="-" disabled>No hay categorias</option>
                  }
                </select>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Subcategoria</label>
                <select className='form-control' name="id_subcategoria" id="id_subcategoria" defaultValue={form?.id_subcategoria || '-'} onChange={handleSetForm} required>
                  <option value="-" disabled> - Seleccione - </option>
                  {
                    subcategorias.length > 0
                      ? subcategorias.map(
                        (subcategoria, key) =>
                          <option key={'scat-' + key} value={subcategoria.id}>{ subcategoria.nombre}</option>
                      )
                      : <option value="-" disabled>No hay subcategorias</option>
                  }
                </select>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Marca</label>
                <select className='form-control' name="id_marca" id="id_marca" defaultValue={form?.id_marca || '-'} onChange={handleSetForm} required>
                  <option value='-' disabled> - Seleccione - </option>
                  {
                    marcas.length > 0
                      ? marcas.map(
                        (marca, key) =>
                          <option key={'marc-' + key} value={marca.id}>{ marca.nombre}</option>
                      )
                      : <option value="-" disabled>No hay ninguna marca</option>
                  }
                </select>
              </div>

              <div className="form-group col-12 col-sm-9 col-md-12">
                <label>Observaciones</label>
                <textarea defaultValue={form?.observaciones || ''}
                  name="observaciones"
                  id="observaciones"
                  className='form-control'
                  cols="30"
                  rows="1"
                  onChange={handleSetForm}>
                </textarea>
              </div>
            </div>
            <div className='form-group my-3 d-flex justify-content-center justify-content-sm-start'>
              <ButtonIcon type="button" btncolor='btn-secondary me-1' iconclass={'fas fa-arrow-left'} handler={() => navigate('/parametros/marcas')} >
                Volver
              </ButtonIcon>

              <ButtonIcon btncolor='btn-primary ms-1' iconclass={'fas fa-save'} disabled={disabled || loading} >
                {
                  !loading
                    ? (method === 'POST' ? 'Agregar' : 'Modificar')
                    : (method === 'POST' ? 'Agregando...' : 'Modificando...')
                }
              </ButtonIcon>
            </div>

            <AlertCollapse message={alerts?.general?.message} show={alerts?.general?.show} type={alerts?.general?.type} />

          </form>
          <div className="modal fade" id="categoriasModal" tabIndex="-1" role="dialog" aria-labelledby="categoriasModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="categoriasModalLabel">Nueva Categoría</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  aaaaaa
                  {/* <FormCategorias /> */}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">GUARDAR</button>
                  <button type="button" className="btn btn-primary">CERRAR</button>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      : loading ? <Loader /> : <Alert variant="danger" className="text-center">No se encontró la marca</Alert>
  )
}

export default FormProductoss
