"use client"

import { useState, useContext } from "react"
import { Outlet } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import MainNav from "../navigation/MainNav"
import Sidebar from "../navigation/Sidebar"

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user } = useContext(AuthContext)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

