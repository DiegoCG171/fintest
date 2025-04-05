import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { AuthProvider } from './config/context/AuthProvider.tsx'
import TemplateProvider from './config/context/TemplateProvider.tsx'
import ToastProvider from './config/context/ToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TemplateProvider>
        <ToastProvider>
          <RouterProvider router={router}/>
        </ToastProvider>
      </TemplateProvider>
    </AuthProvider>
  </StrictMode>,
)
