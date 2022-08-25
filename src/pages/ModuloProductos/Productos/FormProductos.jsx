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
import ModalCategorias from './components/ModalCategorias'
import ModalSubcategorias from './components/ModalSubcategorias'
import ModalMarcas from './components/ModalMarcas'
import ModalProveedores from './components/ModalProveedores'

const FormProductos = () => {
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
  const [proveedores, setProveedores] = useState({})
  const [showModalCategoria, setShowModalCategoria] = useState(false)
  const [showModalSubcategoria, setShowModalSubcategoria] = useState(false)
  const [showModalMarcas, setShowModalMarcas] = useState(false)
  const [showModalProv, setShowModalProv] = useState(false)

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

  const handleFindProveedores = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/proveedores`)
    setLoading(false)
    setProveedores(response.syncJson)
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
        setDataForm(response.syncJson()[0])
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
      setDisabled(true)
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
    e.target.value = e.target.value.toString()
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

  useEffect(handleFindCategorias, [showModalCategoria])
  useEffect(handleFindSubcategorias, [showModalSubcategoria])
  useEffect(handleFindMarcas, [showModalMarcas])
  useEffect(handleFindProveedores, [showModalProv])
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
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className='row g-3'>

              <div className='form-group col-12 col-sm-6 col-md-4'>
                <label>Modelo</label>
                <InputRegex
                  type="text"
                  name="modelo"
                  id="modelo"
                  value={form?.modelo || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[A-z0-9\s])*$/gm}
                  required
                />
                <AlertCollapse message={alerts?.modelo?.message} show={alerts?.modelo?.show} />
              </div>

              <div className='form-group col-12 col-sm-6 col-md-4'>
                <label>Precio</label>
                <InputRegex
                  type="number"
                  name="precio"
                  id="precio"
                  value={form?.precio || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  required
                />
                <AlertCollapse message={alerts?.precio?.message} show={alerts?.precio?.show} />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Stock</label>
                <InputRegex
                  type="number"
                  name="stock"
                  id="stock"
                  value={form?.stock || ''}
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
                  value={form?.stock_min || ''}
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
                  value={form?.imei || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                  maxLength={15}
                />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Categoria</label>
                <div className="input-group mb-3">
                  <select className='form-control' name="id_categoria" id="id_categoria" defaultValue={form?.categoria.id || ''} onChange={handleSetForm} required>
                  <option value='' disabled> - Seleccione - </option>
                  {
                    categorias.length > 0
                      ? categorias.map(
                        (categoria, key) =>
                          <option key={'cat-' + key} value={categoria.id}>{ categoria.nombre}</option>
                      )
                      : <option value="-" disabled>No hay categorias</option>
                  }
                  </select>
                  <button className='btn btn-primary' onClick={() => setShowModalCategoria(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Subcategoria</label>
                <div className="input-group mb-3">
                  <select className='form-control' name="id_subcategoria" id="id_subcategoria" defaultValue={form?.subcategoria.id || ''} onChange={handleSetForm} required>
                    <option value="" disabled> - Seleccione - </option>
                    {
                      subcategorias.length > 0
                        ? subcategorias.map(
                          (subcategoria, key) =>
                            <option key={'scat-' + key} value={subcategoria.id}>{ subcategoria.nombre}</option>
                        )
                        : <option value="-" disabled>No hay subcategorias</option>
                    }
                  </select>
                  <button className='btn btn-primary' onClick={() => setShowModalSubcategoria(true)}>+</button>
              </div>

              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Marca</label>
                <div className="input-group mb-3">
                  <select className='form-control' name="id_marca" id="id_marca" defaultValue={form?.marca.id || ''} onChange={handleSetForm} required>
                    <option value='' disabled> - Seleccione - </option>
                    {
                      marcas.length > 0
                        ? marcas.map(
                          (marca, key) =>
                            <option key={'marc-' + key} value={marca.id}>{ marca.nombre}</option>
                        )
                        : <option value="-" disabled>No hay ninguna marca</option>
                    }
                  </select>
                  <button className='btn btn-primary' onClick={() => setShowModalMarcas(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Proveedor</label>
                <div className="input-group mb-3">
                  <select className='form-control' name="proveedor" id="proveedor" defaultVlalue={form?.proveedores.id || ''}>
                    <option value=""> - Seleccione - </option>
                    {
                      proveedores.length > 0
                        ? proveedores.map(
                          (prov, key) =>
                            <option key={'marc-' + key} value={prov.id}>{ prov.nombre}</option>
                        )
                        : <option value="-" disabled>No hay ningun proveedor</option>
                    }
                  </select>
                  <button className='btn btn-primary' onClick={() => setShowModalProv(true)}>+</button>
                </div>
              </div>
              {/* <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Código de barras</label>
                <div className="input-group mb-3">
                  <input className='form-control' type="number" value={'012345678'} disabled />
                  <button className='btn btn-primary'>+</button>
                </div>
              </div> */}
              <div className="form-group col-12 col-sm-9 col-md-12">
                <label>Observaciones</label>
                <textarea value={form?.observaciones || ''}
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
              <ButtonIcon type="button" btncolor='btn-secondary me-1' iconclass={'fas fa-arrow-left'} handler={() => navigate('/productos')} >
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
          <ModalCategorias show={showModalCategoria} handleShow={setShowModalCategoria} />
          <ModalSubcategorias show={showModalSubcategoria} handleShow={setShowModalSubcategoria} />
          <ModalMarcas show={showModalMarcas} handleShow={setShowModalMarcas} />
          <ModalProveedores show={showModalProv} handleShow={setShowModalProv} />
        </div >
      </div >
      : loading ? <Loader /> : <Alert variant="danger" className="text-center">No se encontró ningún producto</Alert>
  )
}

export default FormProductos
