"use client"

import { useState, useContext } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import MainNav from "../navigation/MainNav"
import Sidebar from "../navigation/Sidebar"

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      {location.pathname === "/" && (
        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-bold mb-2">EventHub</h3>
                <p className="text-gray-600">Simplify College Event Management</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Platform</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/" className="text-gray-600 hover:text-purple-600">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/events" className="text-gray-600 hover:text-purple-600">
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link to="/communities" className="text-gray-600 hover:text-purple-600">
                        Communities
                      </Link>
                    </li>
                    {isAuthenticated ? (
                      <li>
                        <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">
                          Dashboard
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/login" className="text-gray-600 hover:text-purple-600">
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Resources</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-600 hover:text-purple-600">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-purple-600">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-purple-600">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-purple-600">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Contact</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="mailto:info@eventhub.com" className="text-gray-600 hover:text-purple-600">
                        info@eventhub.com
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:text-purple-600">
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default MainLayout

