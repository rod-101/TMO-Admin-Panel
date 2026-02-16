import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <section className="stats-grid" aria-label="Top statistics">
        {/* first layer */}
        <div className="stat-card">
          <div className="stat-value">1,234</div>
          <div className="stat-label">Overall Violation Count</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">76</div>
          <div className="stat-label">Unresolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">34</div>
          <div className="stat-label">New Tickets</div>
        </div>

        {/* second layer */}

        <div className="stat-card">
          <div className="stat-value">63%</div>
          <div className="stat-label">Motorcycle</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">28%</div>
          <div className="stat-label">Tricycle</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">9%</div>
          <div className="stat-label">Cars</div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="large-card">
          <h2>Violations Overtime</h2>
          <p>Weekly</p>
        </div>

        <div className="large-card">
          <h2>Recent Activity</h2>
          <p>Real Time System Activity</p>
        </div>
      </section>
    </>
  );
}
