import { Route, Routes } from 'react-router'

import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Join from './pages/Join'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <Routes>  
   
        <Route path="/dashboard" element={<ProtectedRoute/>}>
        <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      
     
      
    </Routes>
  )
}

export default App  
