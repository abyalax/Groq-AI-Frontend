import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ErrorPage from './pages/Error.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Welcome from './pages/Welcome.jsx'
import GroqPage from './pages/GroqPage.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path:'/welcome',
    element: <Welcome/>,
  },
  {
    path:'/groq',
    element: <GroqPage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
