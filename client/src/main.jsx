import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Student from './components/sidebars/Student.jsx'
import Instructor from './components/sidebars/Instructor.jsx'
import Header from './components/common/Header.jsx'
import InstructorLayout from './layouts/InstructorLayout.jsx'
import InstructorDashboard from './pages/dashboard/InstructorDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>


        <Route path='instructor/dashboard' element={<InstructorLayout/>}>
           <Route index element={<InstructorDashboard/>}/>

        </Route>
     </Route>

      
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
