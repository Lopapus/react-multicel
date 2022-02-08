import Sidebar from './Sidebar'
import Main from './Main'
import { Outlet } from 'react-router-dom'

const Workspace = () => {
  return (
    <>
      <Sidebar />
      <Main content={<Outlet />} />
    </>
  )
}

export default Workspace
