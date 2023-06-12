/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()
  const paths = location.pathname.slice(1).split('/')
  const handleGetPath = (index) => {
    return [...Array(index + 1).keys()].map(route_index => paths[route_index]).join('/')
  }
  return (
    <nav aria-label="breadcrumb" >
      <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
        <li className="breadcrumb-item">
          {
            paths[0] !== ''
              ? <Link to="/"><i className='fa-solid fa-home'></i></Link>
              : <i className='fa-solid fa-home'></i>
          }
        </li>
        {
          paths.map(
            (element, key) =>
              <li key={'breadcrumb-' + key} className="breadcrumb-item">
                {
                  key !== paths.length - 1
                    ? <Link to={'/' + handleGetPath(key)} >{element}</Link>
                    : element
                }
              </li>
          )
        }
        {/* <li className="breadcrumb-item active" aria-current="page">Data</li> */}
      </ol >
    </nav >
  )
}

export default Breadcrumb
