import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Home from './pages/Home.jsx'
import Orders from './pages/Orders.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      }, 
      {
        path: 'signup',
        Component: Signup
      },
      {
        path: 'products/:pid',
        Component: ProductDetails
      },
      {
        path: 'orders',
        Component: Orders
      },
      {
        path: 'admin',
        Component: AdminDashboard
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
