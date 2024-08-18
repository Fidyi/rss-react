import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import FormUncontrolled from './components/FormUncontrolled'
import FormHookForm from './components/FormHookForm'
import { store } from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form-uncontrolled" element={<FormUncontrolled />} />
          <Route path="/form-hook-form" element={<FormHookForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
