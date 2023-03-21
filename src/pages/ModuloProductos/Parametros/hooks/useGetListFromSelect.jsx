import { useEffect, useState } from 'react'
import Server from '../../../../services/Server'
import useFetchToken from '../../../../hooks/fetch-multicel/useFetchToken'

export default function useGetListFromSelect () {
  const [searchFor, setSearchFor] = useState('')
  const [title, setTitle] = useState(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [filteredProductos, setFilteredProductos] = useState([])
  const [checks, setChecks] = useState([])

  const fetchToken = useFetchToken()

  const filterData = (json) => {
    if (json?.length <= 0) {
      return []
    }
    return json.map((item) => {
      return { id: item.id, name: item.nombre }
    })
  }

  const handleChangeSearchFor = (e) => {
    const str = e.target.value
    setSearchFor(str)

    const options = {
      marcas: 'Marca',
      categorias: 'Categoría',
      subcategorias: 'Sub categoría'
    }

    setTitle(options[str] || null)
  }

  const getDataFrom = async (str) => {
    setIsLoading(true)
    setData([])

    const url = `${Server}/${str}`
    const response = await fetchToken(url)

    if (response.ok) {
      const json = response.syncJson()
      setIsLoading(false)
      setData(filterData(json))

      if (json?.length === 1) {
        setFilter(json[0].id)
      }

      if (json?.length <= 0) {
        return []
      }

      return json
    }
  }

  const handleChangeFilter = (e) => {
    const str = e.target.value
    console.log(str)
    setFilter(str)
  }

  const handleToggleCheck = (id) => {
    if (checks.includes(id)) {
      const newChecks = checks.filter((check) => check !== id)
      setChecks(newChecks)
    } else {
      setChecks([...checks, id])
    }
  }

  const handleSelectAllProducts = () => {
    if (checks.length === filteredProductos.length) {
      setChecks([])
      return
    }

    const newChecks = filteredProductos.map((producto) => producto.id)
    setChecks(newChecks)
  }

  const getProductos = async ({ typeOfFilter, typeId }) => {
    const url = `${Server}/productos`

    setChecks([])

    console.log(`typeOfFilter: ${typeOfFilter}`, `typeId: ${typeId}`)

    if (!typeOfFilter || !typeId) {
      console.log('vine al else')

      const response = await fetchToken(url)

      if (response.ok) {
        const json = response.syncJson()

        setFilteredProductos(json)
      }
    } else {
      const response = await fetchToken(url, {
        method: 'PATCH',
        body: JSON.stringify({ typeOfFilter, typeId })
      })

      if (response.ok) {
        const json = response.syncJson()

        setFilteredProductos(json)
      }
    }
  }

  useEffect(() => {
    if (searchFor) {
      getDataFrom(searchFor)
    } else {
      setFilter(null)
    }
  }, [title])

  useEffect(() => {
    getProductos({
      typeOfFilter: searchFor,
      typeId: filter
    }).then()
  }, [filter])

  useEffect(() => {
    setChecks([])
  }, [filter, searchFor])

  useEffect(() => {
    console.log(checks)
  }, [checks])

  return {
    handleChangeSearchFor,
    handleChangeFilter,
    searchFor,
    title,
    data,
    isLoading,
    filteredProductos,
    checks,
    handleSelectAllProducts,
    handleToggleCheck
  }
}
