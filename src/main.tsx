import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from './router.tsx'
import ToastProvider from './config/context/ToastProvider.tsx'
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Provider store={store}>
          <ToastProvider>
            <RouterProvider router={router}/>
          </ToastProvider>
        </Provider>
  </StrictMode>,
)
