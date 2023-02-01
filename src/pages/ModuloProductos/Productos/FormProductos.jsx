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
import Select from 'react-select'

const FormProductos = () => {
  const [data, setData] = useState()
  const [form, setForm, setDataForm] = useSetForm()
  const [alerts, setAlerts] = useState({})
  const [listAlerts, setListAlerts] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState('')
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [showModalCategoria, setShowModalCategoria] = useState(false)
  const [showModalSubcategoria, setShowModalSubcategoria] = useState(false)
  const [showModalMarcas, setShowModalMarcas] = useState(false)
  const [showModalProv, setShowModalProv] = useState(false)

  const fetchToken = useFetchToken()
  const params = useParams()
  const navigate = useNavigate()

  const handleFindMarcas = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/marcas`)
    setLoading(false)
    response.syncJson().map((element) => (
      setMarcas(options => [...options, { value: element.id, label: element.nombre }])
    ))
  }

  const handleFindCategorias = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/categorias`, { method: 'GET' })
    setLoading(false)
    response.syncJson().map((element) => (
      setCategorias(options => [...options, { value: element.id, label: element.nombre }])
    ))
  }

  const handleFindSubcategorias = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/subcategorias`, { method: 'GET' })
    setLoading(false)
    response.syncJson().map((element) => (
      setSubcategorias(options => [...options, { value: element.id, label: element.nombre }])
    ))
  }

  const handleFindProveedores = async () => {
    setLoading(true)
    const response = await fetchToken(`${Server}/proveedores`)
    setLoading(false)
    response.syncJson().map((element) => (
      setProveedores(options => [...options, { value: element.id, label: element.nombre }])
    ))
  }

  const handleFindProducto = async () => {
    try {
      if (params.id) {
        setLoading(true)
        const response = await fetchToken(`${Server}/productos/${params.id}`)
        setLoading(false)
        setDataForm(response.syncJson()[0])
        setData(response.syncJson())
        setMethod('PUT')
      } else {
        setData({})
        setLoading(false)
        setMethod('POST')
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

  const handleUploadProducto = async () => {
    if (JSON.stringify(form) !== JSON.stringify(data)) {
      const content = {
        method,
        body: JSON.stringify({ ...form, id_categoria: form.categoria.id, id_subcategoria: form.subcategoria.id, id_marca: form.marca.id, id_proveedor: form.proveedores.id, facturado: form.facturado })
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      await ProductoSchema.validate({ ...form, id_categoria: form.categoria.id, id_subcategoria: form.subcategoria.id, id_marca: form.marca.id, id_proveedor: form.proveedores.id }, { abortEarly: false })
      handleUploadProducto()
    } catch (errors) {
      console.log({ ...errors })
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

  const selectOnChange = (option, atributo) => {
    console.log(option)
    setForm({ target: { name: atributo, value: { id: option.value, nombre: option.label } } })
  }

  useEffect(handleFindCategorias, [showModalCategoria])
  useEffect(handleFindSubcategorias, [showModalSubcategoria])
  useEffect(handleFindProveedores, [showModalProv])
  useEffect(handleFindMarcas, [showModalMarcas])
  useEffect(handleCheckAlerts, [listAlerts])
  useEffect(handleSetListAlerts, [alerts])
  useEffect(() => {
    handleHideAlert()
    console.log(form)
  }, [form])
  useEffect(handleFindProducto, [])
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
                <div className="input-group">
                  <Select
                    className='w-75'
                    options={categorias}
                    placeholder='Seleccione'
                    defaultValue={params.id !== undefined && { value: form?.categoria.id, label: form?.categoria.nombre }}
                    onChange={(option) => selectOnChange(option, 'categoria')}
                    required
                  />
                  <button className='btn btn-primary' onClick={() => setShowModalCategoria(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Subcategoria</label>
                <div className="input-group">
                  <Select
                    className='w-75'
                    options={subcategorias}
                    placeholder='Seleccione'
                    defaultValue={params.id !== undefined && { value: form?.subcategoria.id, label: form?.subcategoria.nombre }}
                    onChange={(option) => selectOnChange(option, 'subcategoria')}
                    required
                  />
                  <button className='btn btn-primary' onClick={() => setShowModalSubcategoria(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Marca</label>
                <div className='input-group'>
                  <Select
                    className='w-75'
                    options={marcas}
                    placeholder='Seleccione'
                    defaultValue={params.id !== undefined && { value: form?.marca.id, label: form?.marca.nombre }}
                    onChange={(option) => selectOnChange(option, 'marca')}
                    required
                  />
                  <button className='btn btn-primary' onClick={() => setShowModalMarcas(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Proveedor</label>
                <div className="input-group">
                  <Select
                    className='w-75'
                    placeholder='Seleccione'
                    options={proveedores}
                    defaultValue={params.id !== undefined && { value: form?.proveedores.id, label: form?.proveedores.nombre }}
                    onChange={(option) => selectOnChange(option, 'proveedores')}
                    disabled={method === 'PUT' && true}
                    required
                  />
                  <button className='btn btn-primary' onClick={() => setShowModalProv(true)}>+</button>
                </div>
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Código de barras</label>
                <InputRegex
                  type="number"
                  name="codigo_barras"
                  id="codigo_barras"
                  value={form?.codigo_barras || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[0-9])*$/gm}
                />
              </div>

              <div className="form-group col-12 col-sm-6 col-md-4">
                <label>Facturado</label>
                <div className="input-group mb-3">
                  <select className='form-select' onChange={handleSetForm} name="facturado" id="facturado" defaultValue={form?.facturado || null} required>
                    <option value=""> - Seleccione - </option>
                    <option value="1">SI</option>
                    <option value="2">NO</option>
                  </select>
                </div>
              </div>

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

              <ButtonIcon btncolor='btn-primary ms-1' iconclass={'fas fa-save'} disabled={loading || disabled} >
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
