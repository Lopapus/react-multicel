import DataList from '../../../components/DataList'
import CardComponent from '../../../layouts/Card/CardComponent'
import ProductoItemSinOpciones from './components/ProductoItem'
import useGetListFromSelect from './hooks/useGetListFromSelect'
import InputRegex from '../../../components/InputRegex'
import { useSetForm } from '../../../hooks'
import React, { useState } from 'react'
/* import AlertCollapse from '../../../components/AlertCollapse' */

const Precios = () => {
  const {
    handleChangeSearchFor,
    handleChangeFilter,
    searchFor,
    data,
    title,
    isLoading,
    filteredProductos,
    handleToggleCheck,
    handleSelectAllProducts,
    checks
  } = useGetListFromSelect()
  const [form, setForm] = useSetForm()
  const [alerts, setAlerts] = useState({})

  const handleSetForm = (e) => {
    const { name } = e.target
    console.log(name)
    if (alerts[name]) {
      const { message, show } = alerts[name]
      if (show) {
        setAlerts({ ...alerts, [name]: { message, show: false } })
      }
    }
    setForm(e)
  }

  return (
    <>
      <CardComponent title="Cambiar precios">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <label className="my-1 me-2" htmlFor="typeOfFilter">
                Buscar por...
              </label>
              <select
                className="form-select"
                id="typeOfFilter"
                aria-label="Default select example"
                onChange={handleChangeSearchFor}
              >
                <option selected value="">
                  No filtrar
                </option>
                <option value="marcas">Marca</option>
                <option value="categorias">Categoria</option>
                <option value="subcategorias">Subcategoria</option>
              </select>
            </div>
            <div className="col">
              {searchFor && (
                <>
                  <label className="my-1 me-2" htmlFor="typeId">
                    {title}
                  </label>
                  <select
                    className="form-select"
                    id="typeId"
                    aria-label="Default select example"
                    disabled={isLoading}
                    onChange={handleChangeFilter}
                  >
                    {isLoading && (
                      <option selected value="">
                        Cargando...
                      </option>
                    )}

                    {!isLoading && (
                      <option selected value="">
                        Todas
                      </option>
                    )}
                    {data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSelectAllProducts}
              >
                {checks.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-sm-2">
              <label>Monto (requerido)</label>
              <div className='form-group col-12'>
                <InputRegex
                  type="number"
                  name="nombre"
                  id="nombre"
                  value={form?.nombre || ''}
                  className='form-control'
                  onChange={handleSetForm}
                  regex={/^(?:[A-z0-9\s])*$/gm}
                  required
                />
             {/*    <AlertCollapse message={alerts?.nombre?.message} show={alerts?.nombre?.show} /> */}
              </div>
            </div>

            <div className='form-group col-sm-4'>
            <label>Aplicar...</label>
              <select
                className="form-select"
                id="typeOfFilter"
                aria-label="Default select example"
                onChange={(e) => console.log(e.target.value)}
              >
                <option selected value="">
                  Seleccione una opción
                </option>
                <option value="1">Porcentaje</option>
                <option value="2">Monto fijo</option>
              </select>
            </div>
          </div>
        </div>

      </CardComponent>

      {filteredProductos?.length > 0
        ? (<CardComponent>
          <DataList
            list={filteredProductos}
            component={ProductoItemSinOpciones}
            filter={['categoria', 'subcategoria', 'marca', 'modelo']}
            keyname={'productos'}
            viewFilter={false}
            title="Productos"
            actions={{ handleToggleCheck, checks }}
            top={true}
          >
          </DataList>
        </CardComponent>)
        : (<CardComponent>
          <div className="container">
            <div className="row">
              <div className="col">
                <h4 className="text-center">No hay productos</h4>
              </div>
            </div>
          </div>
        </CardComponent>)}
    </>
  )
}

export default Precios
