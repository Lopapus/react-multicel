// Tipos de acciones
const types = {
  login: 'login',
  logout: 'logout'
}

// Acciones que tiene el redux
// Data es el valor que es enviado por el payload
const actions = {
  login: (data) => {
    localStorage.removeItem('user')
    if (data !== null) {
      localStorage.setItem('user', JSON.stringify(data))
      const user = JSON.parse(localStorage.getItem('user'))
      return user
    } else {
      return null
    }
  },
  logout: () => {
    localStorage.removeItem('user')
    return null
  }
}

// valor inicial del estado
let initialState = null
if (localStorage.getItem('user')) {
  initialState = JSON.parse(localStorage.getItem('user'))
}

// Reducer
const DashboardReducer = (state, action) => {
  return actions[action.type](action.payload, state)
}

export { initialState, types }
export default DashboardReducer
