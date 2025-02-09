import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './compoment/Navbar'
import { Sidebar } from 'lucide-react'

const Layout = () => {
  return (
    <div>
      <Navbar/>
<Outlet/>
    </div>
  )
}

export default Layout