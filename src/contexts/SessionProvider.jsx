import { createContext, useReducer } from 'react'
import SessionReducer, { initialState } from './SessionReducer'

// Creamos el contexto
const SessionContext = createContext()

// Creamos un componente que dara el contexto a lo que esté adentro
const SessionProvider = ({ children }) =>
  <SessionContext.Provider value={useReducer(SessionReducer, initialState)}>
    {children}
  </SessionContext.Provider>

// const useSession = () => useContext(SessionContext)[0]
// const useDispatchSession = () => useContext(SessionContext)[1]

export { SessionContext }
export default SessionProvider
