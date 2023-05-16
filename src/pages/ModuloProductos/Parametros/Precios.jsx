import DataList from '../../../components/DataList'
import CardComponent from '../../../layouts/Card/CardComponent'
import ProductoItemSinOpciones from './components/ProductoItem'
import useGetListFromSelect from './hooks/useGetListFromSelect'

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

        <div className="container-fluid mt-2">
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
