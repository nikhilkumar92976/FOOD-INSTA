import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChooseRegister from './Pages/Auth/ChooseResister'
import UserLogin from './Pages/Auth/UserLogin'
import UserResister from './Pages/Auth/UserResister'
import FoodPatnerLogin from './Pages/Auth/FoodPatnerLogin'
import FoodPatnerResister from './Pages/Auth/FoodPatnerResister'
import Home from './Pages/general/Home'
import UserProfile from './Pages/general/UserProfile'
import FoodPartnerProfile from './Pages/general/FoodPartnerProfile'
import CreateFood from './Pages/general/CreateFood'
import VideoPlayer from './Pages/general/VideoPlayer'

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken")
  return isAuthenticated ? children : <Navigate to="/resister" />
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/resister" element={<ChooseRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserResister />} />
        <Route path="/foodpatner/login" element={<FoodPatnerLogin />} />
        <Route path="/foodpatner/register" element={<FoodPatnerResister />} />

        {/* ✅ Protected Home Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected User Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected Food Partner Profile Route */}
        <Route
          path="/food-partner-profile"
          element={
            <ProtectedRoute>
              <FoodPartnerProfile />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected Create Food Route */}
        <Route
          path="/create-food"
          element={
            <ProtectedRoute>
              <CreateFood />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected Video Player Route */}
        <Route
          path="/video/:videoId"
          element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
