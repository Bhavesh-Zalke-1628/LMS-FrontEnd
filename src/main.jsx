import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import store from './Redux/Store.js'

import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
// import { socketProvider } from './Context/ContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <socketProvider> */}
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    {/* </socketProvider> */}
  </Provider>
)
