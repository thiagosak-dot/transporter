import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import AdminLayout from '../../layouts/AdminLayout'

const statusColors = {
  available: 'bg-green-100 text-green-700',
  in_trip: 'bg-blue-100 text-blue-700',
  in_maintenance: 'bg-orange-100 text-orange-700',
  inactive: 'bg-gray-100 text-gray-500',
}

const statusLabels = {
  available: 'Disponível',
  in_trip: 'Em Viagem',
  in_maintenance: 'Em Manutenção',
  inactive: 'Inativo',
}

// Dados fictícios - depois virão da API
const mockVehicles = [
  { id: 1, plate: 'ABC-1234', brand: 'Toyota', model: 'Corolla', year: 2022, type: 'Sedan', status: 'available' },
  { id: 2, plate: 'DEF-5678', brand: 'Fiat', model: 'Strada', year: 2021, type: 'Picape', status: 'in_trip' },
  { id: 3, plate: 'GHI-9012', brand: 'Volkswagen', model: 'Gol', year: 2020, type: 'Hatch', status: 'in_maintenance' },
]

export default function Veiculos() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = mockVehicles.filter(v => {
    const matchSearch = v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus ? v.status === filterStatus : true
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Veículos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a3a5c] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#15304d] transition shadow"
        >
          <PlusIcon className="w-5 h-5 text-green-400" />
          Adicionar
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por placa ou modelo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]"
        >
          <option value="">Todos os status</option>
          <option value="available">Disponível</option>
          <option value="in_trip">Em Viagem</option>
          <option value="in_maintenance">Em Manutenção</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Lista de veículos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Placa</th>
                <th className="px-5 py-3 font-semibold">Marca</th>
                <th className="px-5 py-3 font-semibold">Modelo</th>
                <th className="px-5 py-3 font-semibold">Ano</th>
                <th className="px-5 py-3 font-semibold">Tipo</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    Nenhum veículo encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map(vehicle => (
                  <tr key={vehicle.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3 font-mono font-semibold">{vehicle.plate}</td>
                    <td className="px-5 py-3">{vehicle.brand}</td>
                    <td className="px-5 py-3">{vehicle.model}</td>
                    <td className="px-5 py-3">{vehicle.year}</td>
                    <td className="px-5 py-3">{vehicle.type}</td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[vehicle.status]}`}>
                        {statusLabels[vehicle.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">Editar</button>
                        <button className="text-xs text-red-500 hover:underline">Remover</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Adicionar Veículo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar Veículo</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Placa', name: 'plate' },
                { label: 'Marca', name: 'brand' },
                { label: 'Modelo', name: 'model' },
                { label: 'Ano', name: 'year' },
                { label: 'Tipo', name: 'type' },
                { label: 'Nº Patrimônio', name: 'patrimony_number' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button className="px-5 py-2 bg-[#1a3a5c] text-white text-sm font-semibold rounded-lg hover:bg-[#15304d]">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}