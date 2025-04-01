import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import TemplateProvider from './context/TemplateProvider.tsx'
import ToastProvider from './context/ToastProvider.tsx'

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
