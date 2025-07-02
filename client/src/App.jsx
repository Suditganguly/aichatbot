import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import Chatbot from './components/Chatbot';
import HealthTips from './components/HealthTips';
import MedicineReminder from './components/MedicineReminder';
import BlogFeed from './components/BlogFeed';
import DoctorFinder from './components/DoctorFinder';
import AdminDashboard from './components/AdminDashboard';

const user = { name: 'Sudit', email: 'sudit@health.com', role: 'User' };

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/chatbot', label: 'AI Chatbot' },
  { to: '/tips', label: 'Health Tips & Goals' },
  { to: '/reminder', label: 'Medicine Reminder' },
  { to: '/blog', label: 'Blog/News Feed' },
  { to: '/doctors', label: 'Doctor Finder' },
  { to: '/admin', label: 'Admin Dashboard', admin: true },
];

function UserLayout() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Get current page name
  const currentPage = navLinks.find(l => l.to === location.pathname)?.label || 'Dashboard';
  
  return (
    <div className="flex">
      {/* Modern Sidebar */}
      <aside className={`sidebar ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <span>Smart Health</span>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            title="Close Sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul className="list">
            {navLinks.filter(l => !l.admin).map(link => (
              <li key={link.to} className="nav-item">
                <Link 
                  to={link.to} 
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  <span className="nav-icon">
                    {/* You can add icons here later */}
                    {link.label[0]}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-start min-h-screen">
        {/* Modern Header */}
        <header className={`header ${!sidebarOpen ? 'w-full ml-0' : ''}`} style={{marginLeft: sidebarOpen ? 260 : 0, width: `calc(100vw - ${sidebarOpen ? 260 : 0}px)`, maxWidth: `calc(100vw - ${sidebarOpen ? 260 : 0}px)`}}>
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                className="sidebar-toggle-btn"
                onClick={() => setSidebarOpen(true)}
                title="Open Sidebar"
              >
                ☰
              </button>
            )}
            <div className="page-title">{currentPage}</div>
          </div>
          <div className="header-actions">
            <button 
              className="profile-button" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role}</div>
              </div>
              <div className="avatar">
                {user.name[0]}
              </div>
            </button>
            {/* Profile popover */}
            {profileOpen && (
              <div className="card animate-fadeIn shadow-xl" style={{
                position: 'absolute',
                top: '70px',
                right: '24px',
                minWidth: '240px',
                zIndex: 100
              }}>
                <div className="card-header">
                  <h4 className="text-xl font-bold text-primary">{user.name}</h4>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted">Role:</span>
                    <span className="badge badge-primary">{user.role}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-full" 
                  onClick={() => setProfileOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </header>
        {/* Main Content with blurred dark background */}
        <div className="main-bg-blur-dark" style={{width: `calc(100vw - ${sidebarOpen ? 260 : 0}px)`, maxWidth: `calc(100vw - ${sidebarOpen ? 260 : 0}px)`, minHeight: 'calc(100vh - 70px)', marginLeft: sidebarOpen ? 260 : 0}}>
          <main className="main-content flex flex-col items-center justify-center w-full" style={{marginLeft: 0, width: '100%', maxWidth: '100%', background: 'none'}}>
            <div className="content-wrapper animate-slideInUp" style={{margin: 0, width: '100%', maxWidth: '100%', minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/tips" element={<HealthTips />} />
          <Route path="/reminder" element={<MedicineReminder />} />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/doctors" element={<DoctorFinder />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
