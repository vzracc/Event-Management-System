"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const RoleRoute = ({ roles, children }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" />
  }

  return children ? children : <Outlet />
}

export default RoleRoute

