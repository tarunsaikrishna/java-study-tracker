import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TillNow from './pages/TillNow'
import AddItem from './pages/AddItem'
import NoteDetail from './pages/NoteDetail'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/" />
}

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/till-now" element={
        <ProtectedRoute>
          <TillNow />
        </ProtectedRoute>
      } />
      <Route path="/add-item" element={
        <ProtectedRoute>
          <AddItem />
        </ProtectedRoute>
      } />
      <Route path="/note/:id" element={
        <ProtectedRoute>
          <NoteDetail />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
