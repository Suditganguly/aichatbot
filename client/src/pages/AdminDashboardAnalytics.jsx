import React from 'react';

const AdminDashboardAnalytics = ({ users, articles, doctors }) => (
  <div className="animate-slideInUp" style={{ width: '100%', maxWidth: 1100 }}>
    <h2 className="text-2xl font-bold text-primary mb-6">Analytics</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: 36 }}>
      <div className="card card-stat animate-slideInUp" style={{animationDelay: '0.1s'}}>
        <div className="stat-value">{users.length}</div>
        <div className="stat-label">Total Users</div>
      </div>
      <div className="card card-stat animate-slideInUp" style={{animationDelay: '0.2s'}}>
        <div className="stat-value">{articles.length}</div>
        <div className="stat-label">Blog Articles</div>
      </div>
      <div className="card card-stat animate-slideInUp" style={{animationDelay: '0.3s'}}>
        <div className="stat-value">{users.reduce((a, b) => a + b.reminders, 0)}</div>
        <div className="stat-label">Total Reminders</div>
      </div>
      <div className="card card-stat animate-slideInUp" style={{animationDelay: '0.4s'}}>
        <div className="stat-value">{doctors.length}</div>
        <div className="stat-label">Doctors</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: 32 }}>
      <div className="card glass-card animate-slideInUp" style={{animationDelay: '0.5s', width: '100%'}}>
        <div className="card-header">
          <h3 className="card-title">User Activity</h3>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-700">User Engagement</span>
              <span className="text-primary font-semibold">75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-value" style={{width: '75%'}}></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-700">Reminder Completion</span>
              <span className="text-primary font-semibold">62%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-value" style={{width: '62%'}}></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-700">Article Readership</span>
              <span className="text-primary font-semibold">48%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-value" style={{width: '48%'}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="card animate-slideInUp" style={{animationDelay: '0.6s', width: '100%'}}>
        <div className="card-header">
          <h3 className="card-title">Doctor Specialties</h3>
        </div>
        <ul className="list">
          <li className="list-item">General Physician: 1</li>
          <li className="list-item">Cardiologist: 1</li>
          <li className="list-item">Dermatologist: 0</li>
          <li className="list-item">Pediatrician: 0</li>
          <li className="list-item">Gynecologist: 0</li>
        </ul>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
      <div className="card animate-slideInUp" style={{animationDelay: '0.7s', width: '100%'}}>
        <div className="card-header">
          <h3 className="card-title">User Growth</h3>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>+12%</div>
        <div style={{ color: '#4b5563', fontSize: 16 }}>Growth in the last 30 days</div>
      </div>
      <div className="card animate-slideInUp" style={{animationDelay: '0.8s', width: '100%'}}>
        <div className="card-header">
          <h3 className="card-title">Article Engagement</h3>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>+8%</div>
        <div style={{ color: '#4b5563', fontSize: 16 }}>More articles read this week</div>
      </div>
    </div>
  </div>
);

export default AdminDashboardAnalytics;
