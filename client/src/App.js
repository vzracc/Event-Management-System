import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Layouts
import MainLayout from "./components/layouts/MainLayout"
import DashboardLayout from "./components/layouts/DashboardLayout"

// Components
import PrivateRoute from "./components/PrivateRoute"
import RoleRoute from "./components/RoleRoute"

// Pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import EventDetailsPage from "./pages/EventDetailsPage"
import CreateEventPage from "./pages/CreateEventPage"
import TeamManagePage from "./pages/TeamManagePage"
import EventChatPage from "./pages/EventChatPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="events/:id" element={<EventDetailsPage />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route
              path="events/create"
              element={
                <RoleRoute allowedRoles={["admin", "chairperson"]}>
                  <CreateEventPage />
                </RoleRoute>
              }
            />
            <Route path="events/:id/chat" element={<EventChatPage />} />
            <Route
              path="events/:id/manage"
              element={
                <RoleRoute allowedRoles={["admin", "chairperson"]}>
                  <div>Event Management Page</div>
                </RoleRoute>
              }
            />
            <Route path="teams/:id" element={<div>Team Details Page</div>} />
            <Route
              path="teams/:id/manage"
              element={
                <RoleRoute allowedRoles={["admin", "chairperson", "member"]}>
                  <TeamManagePage />
                </RoleRoute>
              }
            />
            <Route path="communities/:id" element={<div>Community Details Page</div>} />
            <Route
              path="communities/:id/manage"
              element={
                <RoleRoute allowedRoles={["admin", "chairperson"]}>
                  <div>Community Management Page</div>
                </RoleRoute>
              }
            />
            <Route path="profile" element={<div>User Profile Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

