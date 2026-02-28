import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesiProvider from './context/DesiContext.jsx'

createRoot(document.getElementById('root')).render(
  <DesiProvider>
    <App />
  </DesiProvider>,
)
