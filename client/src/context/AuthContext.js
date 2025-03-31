"use client"

import { createContext, useState, useEffect } from "react"
import api from "../api/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Set token to axios headers
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`

          const res = await api.get("/api/auth/me")
          setUser(res.data)
          setIsAuthenticated(true)
        } catch (err) {
          console.error("Error loading user:", err)
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
          setIsAuthenticated(false)
          setError("Authentication failed. Please log in again.")
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [token])

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true)
      const res = await api.post("/api/auth/register", formData)

      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      setUser(res.data.user)
      setIsAuthenticated(true)
      setError(null)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true)
      const res = await api.post("/api/auth/login", formData)

      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      setUser(res.data.user)
      setIsAuthenticated(true)
      setError(null)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    delete api.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

