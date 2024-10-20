import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import InstructorLayout from './layouts/InstructorLayout.jsx'
import InstructorDashboard from './pages/dashboard/instructorDashboardPage/InstructorDashboard.jsx'
import CourseManager from './pages/dashboard/instructorDashboardPage/CourseManager.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>


        <Route path='instructor' element={<InstructorLayout/>}>
           <Route index element={<InstructorDashboard/>}/>
           <Route path='courses' element={<CourseManager/>}/>

        </Route>
     </Route>

      
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
