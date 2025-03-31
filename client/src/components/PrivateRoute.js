"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children ? children : <Outlet />
}

export default PrivateRoute

