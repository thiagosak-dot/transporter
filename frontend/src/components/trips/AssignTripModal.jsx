import { useEffect, useState } from 'react'
import {
  UserPlusIcon,
  TruckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { userService } from '../../services/userService'
import { vehicleService } from '../../services/vehicleService'
import { tripService } from '../../services/tripService'

export default function AssignTripModal({
  trip,
  onClose,
  onSuccess,
}) {
  const [drivers, setDrivers] = useState([])
  const [vehicles, setVehicles] = useState([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')

  const [form, setForm] = useState({
    driver_id: '',
    vehicle_id: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      setError('')

      const [usersResponse, vehiclesResponse] = await Promise.all([
        userService.getAll(),
        vehicleService.getAll(),
      ])

      const allUsers = usersResponse.data || usersResponse
      const allVehicles = vehiclesResponse.data || vehiclesResponse

      const availableDrivers = allUsers.filter(user =>
        user.role === 'driver' &&
        user.active === true &&
        !user.activeTrip
      )

      const availableVehicles = allVehicles.filter(vehicle =>
        vehicle.status === 'available'
      )

      setDrivers(availableDrivers)
      setVehicles(availableVehicles)

    } catch (err) {
      console.error(err)
      setError('Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit() {
    if (!form.driver_id || !form.vehicle_id) {
      setError('Selecione motorista e veículo.')
      return
    }

    try {
      setSaving(true)
      setError('')

      await tripService.assign(trip.id, {
        driver_id: Number(form.driver_id),
        vehicle_id: Number(form.vehicle_id),
      })

      onSuccess()

    } catch (err) {
      console.error(err)

      setError(
        err?.response?.data?.message ||
        'Erro ao atribuir viagem.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-blue-700" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Atribuir Viagem
              </h2>

              <p className="text-xs text-gray-400">
                Selecione motorista e veículo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-5">

          {/* Resumo */}
          <div className="rounded-xl bg-gray-50 border p-4">
            <p className="font-semibold text-gray-800">
              {trip.patient_name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {trip.origin_neighborhood} → {trip.destination_neighborhood}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {trip.destination_city}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">
              Carregando opções...
            </div>
          ) : (
            <>
              {/* Motorista */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Motorista disponível
                </label>

                <select
                  name="driver_id"
                  value={form.driver_id}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Selecione...</option>

                  {drivers.map(driver => (
                    <option
                      key={driver.id}
                      value={driver.id}
                    >
                      {driver.name} ({driver.registration_number})
                    </option>
                  ))}
                </select>
              </div>

              {/* Veículo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Veículo disponível
                </label>

                <select
                  name="vehicle_id"
                  value={form.vehicle_id}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Selecione...</option>

                  {vehicles.map(vehicle => (
                    <option
                      key={vehicle.id}
                      value={vehicle.id}
                    >
                      {vehicle.plate} - {vehicle.brand} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Avisos */}
              {drivers.length === 0 && (
                <p className="text-sm text-orange-600">
                  Nenhum motorista disponível no momento.
                </p>
              )}

              {vehicles.length === 0 && (
                <p className="text-sm text-orange-600">
                  Nenhum veículo disponível no momento.
                </p>
              )}
            </>
          )}

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving || loading}
            className="px-5 py-2 rounded-xl bg-[#1a3a5c] text-white text-sm font-semibold hover:bg-[#15304d] transition disabled:opacity-50"
          >
            {saving ? 'Atribuindo...' : 'Confirmar Atribuição'}
          </button>
        </div>
      </div>
    </div>
  )
}