export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema de gerenciamento de transporte!</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>Veículos</h2>
          <p>10</p>
        </div>
        <div className="stat-card">
          <h2>Motoristas</h2>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h2>Viagens</h2>
          <p>20</p>
        </div>
      </div>
    </div>
  );
}