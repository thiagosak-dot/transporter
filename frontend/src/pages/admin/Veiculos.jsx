import { useEffect, useState } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import AdminLayout from '../../layouts/AdminLayout'
import { vehicleService } from '../../services/vehicleService'

const statusColors = {
  available: 'bg-green-100 text-green-700',
  in_trip: 'bg-blue-100 text-blue-700',
  in_maintenance: 'bg-orange-100 text-orange-700',
  inactive: 'bg-gray-100 text-gray-500',
}

const statusLabels = {
  available: 'Disponível',
  in_trip: 'Em Viagem',
  in_maintenance: 'Manutenção',
  inactive: 'Inativo',
}

/* -------------------------------------------------------------------------- */
/* Cards resumo */
/* -------------------------------------------------------------------------- */

function SummaryCards({ vehicles }) {
  const total = vehicles.length
  const available = vehicles.filter(v => v.status === 'available').length
  const trip = vehicles.filter(v => v.status === 'in_trip').length
  const maintenance = vehicles.filter(v => v.status === 'in_maintenance').length

  const cards = [
    {
      label: 'Total',
      value: total,
      color: 'bg-[#1a3a5c]',
      text: 'text-white',
    },
    {
      label: 'Disponíveis',
      value: available,
      color: 'bg-green-50',
      text: 'text-green-700',
      border: 'border border-green-200',
    },
    {
      label: 'Em Viagem',
      value: trip,
      color: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border border-blue-200',
    },
    {
      label: 'Manutenção',
      value: maintenance,
      color: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border border-orange-200',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map(card => (
        <div
          key={card.label}
          className={`rounded-2xl p-4 shadow-sm ${card.color} ${card.border ?? ''}`}
        >
          <p className={`text-sm opacity-80 ${card.text}`}>{card.label}</p>
          <p className={`text-3xl font-bold ${card.text}`}>{card.value}</p>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Modal */
/* -------------------------------------------------------------------------- */

function VehicleModal({ vehicle, onClose, onSave }) {
  const isEdit = !!vehicle
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    plate: vehicle?.plate ?? '',
    brand: vehicle?.brand ?? '',
    model: vehicle?.model ?? '',
    year: vehicle?.year ?? '',
    type: vehicle?.type ?? '',
    patrimony_number: vehicle?.patrimony_number ?? '',
    current_odometer: vehicle?.current_odometer ?? 0,
    status: vehicle?.status ?? 'available',
  })

  function handleChange(e) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))

    setErrors(prev => ({
      ...prev,
      [name]: null,
    }))
  }

  async function submit() {
    await onSave(form, setErrors)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Editar Veículo' : 'Novo Veículo'}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">

          {[
            ['plate', 'Placa'],
            ['brand', 'Marca'],
            ['model', 'Modelo'],
            ['year', 'Ano'],
            ['type', 'Tipo'],
            ['patrimony_number', 'Nº Patrimônio'],
            ['current_odometer', 'Odômetro Atual'],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>

              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm ${
                  errors[name] ? 'border-red-500' : 'border-gray-200'
                }`}
              />

              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name][0]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="available">Disponível</option>
              <option value="in_trip">Em Viagem</option>
              <option value="in_maintenance">Manutenção</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={submit}
            className="px-5 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-semibold"
          >
            {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Confirm */
/* -------------------------------------------------------------------------- */

function ConfirmModal({ onClose, onConfirm, message }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">Confirmar remoção</h2>
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Página principal */
/* -------------------------------------------------------------------------- */

export default function Veiculos() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    loadVehicles()
  }, [])

  async function loadVehicles() {
    try {
      setLoading(true)

      const response = await vehicleService.getAll()

      setVehicles(response.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  function handleNew() {
    setEditingVehicle(null)
    setShowModal(true)
  }

  function handleEdit(vehicle) {
    setEditingVehicle(vehicle)
    setShowModal(true)
  }

  async function handleSave(form, setErrors) {
    try {
      if (editingVehicle) {
        await vehicleService.update(editingVehicle.id, form)
      } else {
        await vehicleService.create(form)
      }

      await loadVehicles()
      setShowModal(false)
      setEditingVehicle(null)

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors)
        return
      }

      console.error(error)
    }
  }

  function handleDelete(vehicle) {
    setConfirmDelete(vehicle)
  }

  async function confirmDeleteVehicle() {
    await vehicleService.delete(confirmDelete.id)
    await loadVehicles()
    setConfirmDelete(null)
  }

  const filtered = vehicles.filter(v => {
    const text =
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase())

    const status = filterStatus ? v.status === filterStatus : true

    return text && status
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-500">
          Carregando veículos...
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Veículos</h1>

        <button
          onClick={handleNew}
          className="flex items-center gap-2 bg-[#1a3a5c] text-white px-5 py-2.5 rounded-full font-semibold shadow"
        >
          <PlusIcon className="w-5 h-5 text-green-400" />
          Adicionar
        </button>
      </div>

      <SummaryCards vehicles={vehicles} />

      {/* filtros */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Buscar veículo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full"
          />
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Todos status</option>
          <option value="available">Disponível</option>
          <option value="in_trip">Em Viagem</option>
          <option value="in_maintenance">Manutenção</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

      {/* tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">Lista de veículos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3">Placa</th>
                <th className="px-5 py-3">Veículo</th>
                <th className="px-5 py-3">Ano</th>
                <th className="px-5 py-3">KM</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Nenhum veículo encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map(vehicle => (
                  <tr
                    key={vehicle.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 font-mono font-semibold">
                      {vehicle.plate}
                    </td>

                    <td className="px-5 py-3">
                      <div>
                        <p className="font-semibold">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-xs text-gray-400">
                          {vehicle.type || 'Não informado'}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-3">{vehicle.year}</td>

                    <td className="px-5 py-3">
                      {vehicle.current_odometer} km
                    </td>

                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[vehicle.status]}`}>
                        {statusLabels[vehicle.status]}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="text-blue-500"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(vehicle)}
                          className="text-red-500"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
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
        <VehicleModal
          vehicle={editingVehicle}
          onClose={() => {
            setShowModal(false)
            setEditingVehicle(null)
          }}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          message={`Deseja remover ${confirmDelete.plate}?`}
          onClose={() => setConfirmDelete(null)}
          onConfirm={confirmDeleteVehicle}
        />
      )}

    </AdminLayout>
  )
}