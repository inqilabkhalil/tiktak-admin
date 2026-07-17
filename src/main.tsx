import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 Bura diqqət!
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 Əgər router burdadırsa... */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)