import { PlusIcon, CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AdminLayout from '../../layouts/AdminLayout'

// Dados fictícios - depois virão da API
const frotaData = {
  disponiveis: 10,
  manutencao: 20,
  emViagem: 15,
}

const motoristasData = {
  ativos: 10,
  indisponiveis: 5,
  emViagem: 15,
}

const gastosData = [
  { name: 'Combustível', value: 6000, color: '#6b9bd2' },
  { name: 'Manutenção', value: 1500, color: '#e63946' },
  { name: 'Outros', value: 800, color: '#84cc16' },
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
    label: 'Relatório de consumo',
    icon: <ChartBarIcon className="w-8 h-8" />,
    color: 'bg-red-500 hover:bg-red-600',
    path: '/admin/relatorios/consumo'
  },
]

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

  return (
    <AdminLayout>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Relatório de Frota */}
        <SectionCard title="Relatório de frota">
          <div className="flex justify-around">
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/></svg>}
              label="Veículos disponíveis"
              value={frotaData.disponiveis}
            />
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
              label="Em manutenção"
              value={frotaData.manutencao}
            />
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>}
              label="Em viagem"
              value={frotaData.emViagem}
            />
          </div>
        </SectionCard>

        {/* Ações Rápidas */}
        <SectionCard title="Ações Rápidas">
          <div className="flex justify-around gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`${action.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 w-28 transition-all transform hover:scale-105 shadow-md`}
              >
                {action.icon}
                <span className="text-xs font-semibold text-center leading-tight">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Relatório de Motoristas */}
        <SectionCard title="Relatório de motoristas">
          <div className="flex justify-around">
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
              label="Motoristas ativos"
              value={motoristasData.ativos}
            />
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
              label="Indisponíveis"
              value={motoristasData.indisponiveis}
            />
            <StatCard
              icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>}
              label="Em viagem"
              value={motoristasData.emViagem}
            />
          </div>
        </SectionCard>

        {/* Gastos Mensais */}
        <SectionCard title="Gastos Mensais">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={gastosData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {gastosData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

      </div>
    </AdminLayout>
  )
}