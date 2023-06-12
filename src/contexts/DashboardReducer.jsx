// Tipos de acciones
const types = {
  action: 'action'
}

// Acciones que tiene el redux
// Data es el valor que es enviado por el payload
const actions = {
  action: async (data) => {
    console.log(data)
  }
}

// valor inicial del estado
const initialState = null

// Reducer
const DashboardReducer = (state, action) => {
  return actions[action.type](action.payload, state)
}

export { initialState, types }
export default DashboardReducer
