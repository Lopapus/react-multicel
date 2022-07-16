import React from 'react'
import ReactDOM from 'react-dom'
import 'animate.css'
import 'bootstrap'
import './index.css'
import './css/volt.css'
import './css/volt.css.map'
import Routing from './router'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
