
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Instructor from '../components/sidebars/Instructor'
 
 const InstructorLayout = () => {
   return (
    <>
      <Header/>
    <div className='flex' >
      <Instructor/>

      <main className='flex w-[calc(100vw-256px)] bg-gray-200'>
         <Outlet/>
      </main>
      
    </div>

      


    </>
   )
 }
 
 export default InstructorLayout