import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublishedPortfolio } from './pages/PublishedPortfolio.tsx'
import { Login } from './pages/Login.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app',
        element: <App />
      }
    ]
  },
  {
    path: '/published/:id',
    element: <PublishedPortfolio />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
