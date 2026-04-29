import { useEffect, useMemo, useState } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import AdminLayout from '../../layouts/AdminLayout'
import AssignTripModal from '../../components/trips/AssignTripModal'
import { tripService } from '../../services/tripService'

const statusMap = {
  pending: {
    label: 'Pendente',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  assigned: {
    label: 'Atribuída',
    badge: 'bg-blue-100 text-blue-700',
  },
  in_progress: {
    label: 'Em andamento',
    badge: 'bg-purple-100 text-purple-700',
  },
  completed: {
    label: 'Concluída',
    badge: 'bg-green-100 text-green-700',
  },
  cancelled: {
    label: 'Cancelada',
    badge: 'bg-red-100 text-red-700',
  },
}

const priorityMap = {
  normal: 'bg-gray-100 text-gray-700',
  high: 'bg-orange-100 text-orange-700',
  emergency: 'bg-red-100 text-red-700',
}

function StatusBadge({ status }) {
  const item = statusMap[status] || statusMap.pending

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.badge}`}>
      {item.label}
    </span>
  )
}

function PriorityBadge({ priority }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityMap[priority]}`}>
      {priority === 'normal' && 'Normal'}
      {priority === 'high' && 'Alta'}
      {priority === 'emergency' && 'Emergência'}
    </span>
  )
}

function SummaryCards({ trips }) {
  const cards = [
    {
      label: 'Pendentes',
      value: trips.filter(t => t.status === 'pending').length,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      label: 'Atribuídas',
      value: trips.filter(t => t.status === 'assigned').length,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Em andamento',
      value: trips.filter(t => t.status === 'in_progress').length,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Concluídas',
      value: trips.filter(t => t.status === 'completed').length,
      color: 'bg-green-50 text-green-700 border-green-200',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map(card => (
        <div
          key={card.label}
          className={`rounded-2xl border p-4 shadow-sm ${card.color}`}
        >
          <p className="text-sm opacity-80">{card.label}</p>
          <p className="text-3xl font-extrabold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}

function CreateTripModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    patient_name: '',
    priority: 'normal',
    origin_street: '',
    origin_neighborhood: '',
    destination_street: '',
    destination_neighborhood: '',
    destination_city: '',
    observations: '',
  })

  function change(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Nova Viagem</h2>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium">Paciente</label>
            <input
              name="patient_name"
              value={form.patient_name}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Prioridade</label>
            <select
              name="priority"
              value={form.priority}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="normal">Normal</option>
              <option value="high">Alta</option>
              <option value="emergency">Emergência</option>
            </select>
          </div>

          <div></div>

          <div>
            <label className="text-sm font-medium">Rua Origem</label>
            <input
              name="origin_street"
              value={form.origin_street}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bairro Origem</label>
            <input
              name="origin_neighborhood"
              value={form.origin_neighborhood}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Rua Destino</label>
            <input
              name="destination_street"
              value={form.destination_street}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bairro Destino</label>
            <input
              name="destination_neighborhood"
              value={form.destination_neighborhood}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Cidade Destino</label>
            <input
              name="destination_city"
              value={form.destination_city}
              onChange={change}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Observações</label>
            <textarea
              name="observations"
              value={form.observations}
              onChange={change}
              rows="3"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 rounded-lg bg-[#1a3a5c] text-white"
          >
            Criar Viagem
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Viagens() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadTrips()
  }, [])

  async function loadTrips() {
    try {
      setLoading(true)
      const response = await tripService.getAll()
      setTrips(response.data || response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function createTrip(data) {
    await tripService.create(data)
    setShowModal(false)
    loadTrips()
  }

  async function startTrip(id) {
    await tripService.start(id, {
      initial_odometer: 0,
    })
    loadTrips()
  }

  async function finishTrip(id) {
    const km = prompt('Informe KM final:')
    if (!km) return

    await tripService.finish(id, {
      final_odometer: Number(km),
    })

    loadTrips()
  }

  async function cancelTrip(id) {
    if (!confirm('Cancelar viagem?')) return

    await tripService.cancel(id, {
      cancellation_reason: 'Cancelado manualmente',
    })

    loadTrips()
  }

  const filtered = useMemo(() => {
    return trips.filter(t =>
      t.patient_name.toLowerCase().includes(search.toLowerCase())
    )
  }, [trips, search])

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Viagens</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1a3a5c] text-white px-5 py-2.5 rounded-full font-semibold"
        >
          <PlusIcon className="w-5 h-5 text-green-400" />
          Agendar
        </button>
      </div>

      <SummaryCards trips={trips} />

      <div className="mb-4 relative max-w-sm">
        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar paciente..."
          className="w-full pl-9 pr-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="bg-gray-100 px-5 py-3 border-b">
          <h2 className="font-bold text-gray-800">Central de Viagens</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="px-5 py-3">Paciente</th>
                <th className="px-5 py-3">Origem</th>
                <th className="px-5 py-3">Destino</th>
                <th className="px-5 py-3">Prioridade</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Motorista</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Carregando...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Nenhuma viagem encontrada.
                  </td>
                </tr>
              ) : (
                filtered.map(trip => (
                  <tr key={trip.id} className="border-b hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium">{trip.patient_name}</td>

                    <td className="px-5 py-3">
                      {trip.origin_neighborhood}
                    </td>

                    <td className="px-5 py-3">
                      {trip.destination_neighborhood} / {trip.destination_city}
                    </td>

                    <td className="px-5 py-3">
                      <PriorityBadge priority={trip.priority} />
                    </td>

                    <td className="px-5 py-3">
                      <StatusBadge status={trip.status} />
                    </td>

                    <td className="px-5 py-3">
                      {trip.driver?.name || (
                        <span className="text-gray-400 italic">
                          Não atribuído
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex gap-2 flex-wrap">
                        {trip.status === 'assigned' && (
                          <button
                            onClick={() => startTrip(trip.id)}
                            className="text-blue-600"
                            title="Iniciar"
                          >
                            <PlayIcon className="w-4 h-4" />
                          </button>
                        )}

                        {trip.status === 'in_progress' && (
                          <button
                            onClick={() => finishTrip(trip.id)}
                            className="text-green-600"
                            title="Finalizar"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                        )}

                        {(trip.status === 'pending' ||
                          trip.status === 'assigned') && (
                          <button
                            onClick={() => cancelTrip(trip.id)}
                            className="text-red-600"
                            title="Cancelar"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                        )}

                        {trip.status === 'pending' && (
                          <button
                            className="text-gray-600"
                            title="Atribuir"
                          >
                            <UserPlusIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CreateTripModal
          onClose={() => setShowModal(false)}
          onSave={createTrip}
        />
      )}
    </AdminLayout>
  )
}