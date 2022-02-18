import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './css/volt.css'
import './css/volt.css.map'
import Routing from './router'

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
)
