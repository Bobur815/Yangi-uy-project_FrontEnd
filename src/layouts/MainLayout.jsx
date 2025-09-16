import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className='flex-grow'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout