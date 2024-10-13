import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

const UserLayout = () => {

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Common header component */}
      <Navbar />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout