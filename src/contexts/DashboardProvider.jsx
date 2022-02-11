import { createContext, useReducer } from 'react'
import DashboardReducer, { initialState } from './DashboardReducer'

// Creamos el contexto
const DashboardContext = createContext()

// Creamos un componente que dara el contexto a lo que esté adentro
const DashboardProvider = ({ children }) =>
  <DashboardContext.Provider value={useReducer(DashboardReducer, initialState)}>
    {children}
  </DashboardContext.Provider>

// const useDashboard = () => useContext(DashboardContext)[0]
// const useDispatchDashboard = () => useContext(DashboardContext)[1]

export { DashboardContext }
export default DashboardProvider
