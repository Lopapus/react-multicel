import React, { useState, useEffect } from 'react'
import ButtonIcon from './ButtonIcon'

const DataList = ({ list = [], component: Component, filter = [], keyname = 'data-list' }) => {
  const [elements, setElements] = useState(list.slice(0, 5))
  const [pagination, setPagination] = useState({
    pages: 1,
    page: 1
  })
  const [filters, setFilters] = useState({
    search: '',
    rows: 5
  })

  const handleSetFilter = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSetPage = (page) => {
    if (page > 0 && page <= pagination.pages) {
      const new_pagination = { ...pagination, page }
      handleFilterList(new_pagination)
      setPagination(new_pagination)
    }
  }

  const handleFilterList = (config_page = { ...pagination }) => {
    const { search, rows } = filters

    let filter_list = [...list]

    if (search !== '') {
      // filter_list = list.filter(element => (element.nombre).toLowerCase().includes(search.toLocaleLowerCase()))
      filter_list = list.filter(element => {
        const validation = filter.map(attribute => element[attribute].toLowerCase().includes(search.toLocaleLowerCase()))
        return validation.includes(true)
      })
    }

    config_page.pages = Math.ceil(filter_list.length / rows)

    if (config_page.page > config_page.pages) {
      config_page.page = 1
    }

    filter_list = filter_list.slice((rows * (config_page.page - 1)), rows * (config_page.page))

    setPagination(config_page)
    setElements(filter_list)
  }

  useEffect(handleFilterList, [filters, list])

  return (
    <>
    <div>
      <div className='row d-flex justify-content-between'>
          <div className="col-8 col-md-5">
            <input name='search' placeholder='Buscar...' className='form-control rounded-pill' type='search' onChange={handleSetFilter} autoComplete="off" />
          </div>
          <div className="col-4 col-md-2 col-xl-1">
              <select name='rows' className='form-select' onChange={handleSetFilter}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
          </div>
      </div>
      <div className='my-3'>
        < ul className="list-group list-group-flush list my--3" >
          {
            elements.map(
              (element, key) =>
                <Component key={`${keyname}-n${key + 1}`} data={element} />
            )
          }
        </ul>
      </div>
      {
        elements.length === 0 && filters.search !== ''
          ? <h5 className='text-center'>No se encontraron elementos</h5>
          : <div className='d-flex justify-content-center justify-content-md-end'>
            {
              pagination.pages > 1 &&
              <div>
              <ButtonIcon
                disabled={pagination.page === 1}
                btncolor={'btn-outline-primary me-2'} btnsize={'btn-sm'}
                iconclass={'fa-solid fa-arrow-left'}
                handler={() => handleSetPage(pagination.page - 1)}
              >Anterior</ButtonIcon>
              <ButtonIcon
                disabled={pagination.page + 1 > pagination.pages}
                btncolor={'btn-outline-primary ms-2'} btnsize={'btn-sm'} iconclass={'fa-solid fa-arrow-right'}
                handler={() => handleSetPage(pagination.page + 1)}
              >Siguiente</ButtonIcon>
            </div>
            }

            </div>
      }
    </div>
    </>
  )
}

export default DataList
