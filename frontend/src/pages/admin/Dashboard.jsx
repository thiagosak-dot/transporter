import {
  PlusIcon,
  CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import AdminLayout from '../../layouts/AdminLayout'
import { getDashboard } from '../../services/dashboardService'
  
function StatCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3">
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-[#1a3a5c]">
        {icon}
      </div>

      <p className="text-sm text-gray-600 text-center">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
        <h2 className="font-bold text-gray-800">{title}</h2>
      </div>

      <div className="p-5">{children}</div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getDashboard()
        setData(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-lg">Carregando dashboard...</p>
      </AdminLayout>
    )
  }

  const gastosData = [
    {
      name: 'Pendentes',
      value: data.trips.pending,
      color: '#6b9bd2'
    },
    {
      name: 'Em andamento',
      value: data.trips.in_progress,
      color: '#e63946'
    },
    {
      name: 'Concluídas',
      value: data.trips.completed,
      color: '#84cc16'
    }
  ]

  const quickActions = [
    {
      label: 'Adicionar carro',
      icon: <PlusIcon className="w-8 h-8" />,
      color: 'bg-green-500 hover:bg-green-600',
      path: '/admin/veiculos/novo'
    },
    {
      label: 'Agendar manutenção',
      icon: <CalendarDaysIcon className="w-8 h-8" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/admin/manutencoes/nova'
    },
    {
      label: 'Relatórios',
      icon: <ChartBarIcon className="w-8 h-8" />,
      color: 'bg-red-500 hover:bg-red-600',
      path: '/admin/relatorios'
    }
  ]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <SectionCard title="Relatório de Frota">
          <div className="flex justify-around">
            <StatCard label="Disponíveis" value={data.fleet.available} />
            <StatCard label="Manutenção" value={data.fleet.maintenance} />
            <StatCard label="Em viagem" value={data.fleet.in_trip} />
          </div>
        </SectionCard>

        <SectionCard title="Ações Rápidas">
          <div className="flex justify-around gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`${action.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 w-28`}
              >
                {action.icon}
                <span className="text-xs font-semibold text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Motoristas">
          <div className="flex justify-around">
            <StatCard label="Ativos" value={data.drivers.active} />
            <StatCard label="Inativos" value={data.drivers.inactive} />
            <StatCard label="Em viagem" value={data.drivers.in_trip} />
          </div>
        </SectionCard>

        <SectionCard title="Viagens">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={gastosData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {gastosData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

      </div>
    </AdminLayout>
  )
}