import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

      
     </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
