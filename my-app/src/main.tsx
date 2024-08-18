import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'

import './index.css'
import FormUncontrolled from './components/FormUncontrolled'
import FormHookForm from './components/FormHookForm'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form-uncontrolled" element={<FormUncontrolled />} />
        <Route path="/form-hook-form" element={<FormHookForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
