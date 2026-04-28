import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Veiculos from './pages/admin/Veiculos'
import Viagens from './pages/admin/Viagens'
import Manutencoes from './pages/admin/Manutencoes'
import Usuarios from './pages/admin/Usuarios'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/veiculos" element={<Veiculos />} />
        <Route path="/admin/viagens" element={<Viagens />} />
        <Route path="/admin/manutencoes" element={<Manutencoes />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}