import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import AdminLayout from '../../layouts/AdminLayout'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  assigned: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

const statusLabels = {
  pending: 'Pendente',
  assigned: 'Atribuída',
  in_progress: 'Em Andamento',
  completed: 'Concluída',
  cancelled: 'Cancelada',
}

const mockTrips = [
  {
    id: 1,
    patient_name: 'João da Silva',
    origin_neighborhood: 'Centro',
    destination_neighborhood: 'Vila Nova',
    destination_city: 'São Paulo',
    driver: { name: 'Carlos Souza' },
    status: 'in_progress',
    started_at: '2026-03-29 10:00',
  },
  {
    id: 2,
    patient_name: 'Maria Oliveira',
    origin_neighborhood: 'Jardim América',
    destination_neighborhood: 'Hospital Municipal',
    destination_city: 'São Paulo',
    driver: null,
    status: 'pending',
    started_at: null,
  },
]

export default function Viagens() {
  const [showModal, setShowModal] = useState(false)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Viagens</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a3a5c] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#15304d] transition shadow"
        >
          <PlusIcon className="w-5 h-5 text-green-400" />
          Agendar
        </button>
      </div>

      {/* Viagens programadas próximas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Viagens programadas próximas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Paciente</th>
                <th className="px-5 py-3 font-semibold">Origem</th>
                <th className="px-5 py-3 font-semibold">Destino</th>
                <th className="px-5 py-3 font-semibold">Motorista</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockTrips.map(trip => (
                <tr key={trip.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-medium">{trip.patient_name}</td>
                  <td className="px-5 py-3 text-gray-600">{trip.origin_neighborhood}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {trip.destination_neighborhood} - {trip.destination_city}
                  </td>
                  <td className="px-5 py-3">
                    {trip.driver
                      ? trip.driver.name
                      : <span className="text-gray-400 italic">Não atribuído</span>
                    }
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[trip.status]}`}>
                      {statusLabels[trip.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:underline">Ver</button>
                      <button className="text-xs text-red-500 hover:underline">Cancelar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendário de viagens */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Calendário de viagens</h2>
        </div>
        <div className="p-6 min-h-64 flex items-center justify-center text-gray-400">
          {/* Aqui você pode integrar uma lib de calendário como react-big-calendar */}
          <p className="text-sm">Calendário será implementado aqui (react-big-calendar)</p>
        </div>
      </div>

      {/* Modal Agendar Viagem */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Agendar Viagem</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Nome do Paciente', name: 'patient_name' },
                { label: 'Rua de Origem', name: 'origin_street' },
                { label: 'Bairro de Origem', name: 'origin_neighborhood' },
                { label: 'Rua de Destino', name: 'destination_street' },
                { label: 'Bairro de Destino', name: 'destination_neighborhood' },
                { label: 'Cidade de Destino', name: 'destination_city' },
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
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}