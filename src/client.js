import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'

hydrate(
  <BrowserRouter>
    <Route path='/' component={App} />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
