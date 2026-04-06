import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import AdminLayout from '../../layouts/AdminLayout'

const typeColors = {
  preventive: 'bg-blue-100 text-blue-700',
  corrective: 'bg-red-100 text-red-700',
  inspection: 'bg-yellow-100 text-yellow-700',
  oil_change: 'bg-green-100 text-green-700',
  mechanical: 'bg-purple-100 text-purple-700',
  electrical: 'bg-orange-100 text-orange-700',
}

const typeLabels = {
  preventive: 'Preventiva',
  corrective: 'Corretiva',
  inspection: 'Inspeção',
  oil_change: 'Troca de Óleo',
  mechanical: 'Mecânica',
  electrical: 'Elétrica',
}

const mockMaintenances = [
  {
    id: 1,
    vehicle: { plate: 'ABC-1234', model: 'Corolla' },
    type: 'preventive',
    description: 'Revisão geral do veículo',
    start_date: '2026-03-20',
    end_date: null,
    cost: 450.00,
  },
  {
    id: 2,
    vehicle: { plate: 'DEF-5678', model: 'Strada' },
    type: 'oil_change',
    description: 'Troca de óleo e filtro',
    start_date: '2026-03-25',
    end_date: '2026-03-25',
    cost: 180.00,
  },
]

export default function Manutencoes() {
  const [showModal, setShowModal] = useState(false)
  const [filterActive, setFilterActive] = useState('all')

  const filtered = mockMaintenances.filter(m => {
    if (filterActive === 'active') return m.end_date === null
    if (filterActive === 'finished') return m.end_date !== null
    return true
  })

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Manutenção</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a3a5c] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#15304d] transition shadow"
        >
          <PlusIcon className="w-5 h-5 text-green-400" />
          Agendar
        </button>
      </div>

      {/* Filtro */}
      <div className="flex gap-2 mb-4">
        {[
          { value: 'all', label: 'Todas' },
          { value: 'active', label: 'Em andamento' },
          { value: 'finished', label: 'Finalizadas' },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilterActive(opt.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filterActive === opt.value
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Manutenções programadas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Veículo</th>
                <th className="px-5 py-3 font-semibold">Tipo</th>
                <th className="px-5 py-3 font-semibold">Descrição</th>
                <th className="px-5 py-3 font-semibold">Início</th>
                <th className="px-5 py-3 font-semibold">Término</th>
                <th className="px-5 py-3 font-semibold">Custo</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    Nenhuma manutenção encontrada.
                  </td>
                </tr>
              ) : (
                filtered.map(m => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <p className="font-mono font-semibold">{m.vehicle.plate}</p>
                      <p className="text-xs text-gray-400">{m.vehicle.model}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[m.type]}`}>
                        {typeLabels[m.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600 max-w-xs truncate">{m.description}</td>
                    <td className="px-5 py-3">{m.start_date}</td>
                    <td className="px-5 py-3">
                      {m.end_date ?? <span className="text-orange-500 font-medium">Em andamento</span>}
                    </td>
                    <td className="px-5 py-3 font-medium">
                      R$ {m.cost.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        m.end_date === null
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {m.end_date === null ? 'Em andamento' : 'Finalizada'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        {m.end_date === null && (
                          <button className="text-xs text-green-600 hover:underline">Finalizar</button>
                        )}
                        <button className="text-xs text-blue-600 hover:underline">Ver</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Manutenção */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Agendar Manutenção</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Veículo</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]">
                  <option>Selecione o veículo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Tipo de Manutenção</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]">
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Descrição</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Data de Início</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Custo Estimado</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]" />
                </div>
              </div>
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