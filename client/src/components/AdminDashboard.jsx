import React, { useState } from 'react';
import AdminDashboardOverview from '../pages/AdminDashboardOverview';
import AdminDashboardUsers from '../pages/AdminDashboardUsers';
import AdminDashboardArticles from '../pages/AdminDashboardArticles';
import AdminDashboardDoctors from '../pages/AdminDashboardDoctors';
import AdminDashboardAnalytics from '../pages/AdminDashboardAnalytics';

const initialUsers = [
  { id: 1, name: 'Amit Kumar', email: 'amit@example.com', reminders: 2 },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', reminders: 1 },
  { id: 3, name: 'Rahul Das', email: 'rahul@example.com', reminders: 3 },
];

const initialArticles = [
  { id: 1, title: '5 Simple Ways to Boost Your Immune System', date: '2024-05-01' },
  { id: 2, title: 'The Importance of Regular Exercise', date: '2024-04-28' },
];

const initialDoctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Physician', location: 'Kolkata', rating: 4.8 },
  { id: 2, name: 'Dr. Arjun Mehta', specialty: 'Cardiologist', location: 'Delhi', rating: 4.6 },
];

const admin = { name: 'Admin', email: 'admin@health.com', role: 'Super Admin' };

const buttonStyle = {
  background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 500, cursor: 'pointer'
};
const dangerButton = { ...buttonStyle, background: '#d32f2f' };
const cancelButton = { ...buttonStyle, background: '#888' };

const sectionNames = {
  dashboard: 'Admin Dashboard',
  users: 'Users',
  articles: 'Articles',
  doctors: 'Doctors',
  analytics: 'Analytics',
};

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [userEdit, setUserEdit] = useState({ name: '', email: '' });

  const [articles, setArticles] = useState(initialArticles);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleEdit, setArticleEdit] = useState({ title: '', date: '' });
  const [newArticle, setNewArticle] = useState({ title: '', date: '' });

  const [doctors, setDoctors] = useState(initialDoctors);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctorEdit, setDoctorEdit] = useState({ name: '', specialty: '', location: '', rating: '' });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', location: '', rating: '' });
  const [profileOpen, setProfileOpen] = useState(false);

  // User management handlers
  const startEditUser = (user) => {
    setEditingUser(user.id);
    setUserEdit({ name: user.name, email: user.email });
  };
  const saveEditUser = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...userEdit } : u));
    setEditingUser(null);
  };
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Article management handlers
  const startEditArticle = (article) => {
    setEditingArticle(article.id);
    setArticleEdit({ title: article.title, date: article.date });
  };
  const saveEditArticle = (id) => {
    setArticles(articles.map(a => a.id === id ? { ...a, ...articleEdit } : a));
    setEditingArticle(null);
  };
  const deleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };
  const addArticle = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.date) return;
    setArticles([
      { id: Date.now(), ...newArticle },
      ...articles
    ]);
    setNewArticle({ title: '', date: '' });
  };

  // Doctor management handlers
  const startEditDoctor = (doctor) => {
    setEditingDoctor(doctor.id);
    setDoctorEdit({ name: doctor.name, specialty: doctor.specialty, location: doctor.location, rating: doctor.rating });
  };
  const saveEditDoctor = (id) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, ...doctorEdit, rating: parseFloat(doctorEdit.rating) } : d));
    setEditingDoctor(null);
  };
  const deleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };
  const addDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.location || !newDoctor.rating) return;
    setDoctors([
      { id: Date.now(), ...newDoctor, rating: parseFloat(newDoctor.rating) },
      ...doctors
    ]);
    setNewDoctor({ name: '', specialty: '', location: '', rating: '' });
  };

  // Dashboard summary cards
  const summaryCards = [
    { label: 'Users', value: users.length },
    { label: 'Articles', value: articles.length },
    { label: 'Doctors', value: doctors.length },
    { label: 'Reminders', value: users.reduce((a, b) => a + b.reminders, 0) },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <span>Smart Health Admin</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul className="list">
            {Object.entries(sectionNames).map(([key, label]) => (
              <li key={key} className="nav-item">
                <a 
                  className={`nav-link ${section === key ? 'active' : ''}`}
                  onClick={() => setSection(key)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">
                    {label[0]}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-start min-h-screen">
        {/* Modern Header */}
        <header className="header" style={{marginLeft: 260, width: 'calc(100vw - 260px)', maxWidth: 'calc(100vw - 260px)'}}>
          <div className="page-title">{sectionNames[section]}</div>
          <div className="header-actions">
            <button 
              className="profile-button" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="user-info">
                <div className="user-name">{admin.name}</div>
                <div className="user-role">{admin.role}</div>
              </div>
              <div className="avatar">
                {admin.name[0]}
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
                  <h4 className="text-xl font-bold text-primary">{admin.name}</h4>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted">Email:</span>
                    <span>{admin.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted">Role:</span>
                    <span className="badge badge-primary">{admin.role}</span>
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
        <div className="main-bg-blur-dark" style={{width: 'calc(100vw - 260px)', maxWidth: 'calc(100vw - 260px)', minHeight: 'calc(100vh - 70px)', marginLeft: 260}}>
          <main className="main-content flex flex-col items-center justify-center w-full" style={{marginLeft: 0, width: '100%', maxWidth: '100%', background: 'none'}}>
            <div className="content-wrapper animate-slideInUp" style={{margin: 0, width: '100%', maxWidth: '100%', minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {section === 'dashboard' && (
                <AdminDashboardOverview summaryCards={summaryCards} />
              )}
              {section === 'users' && (
                <AdminDashboardUsers 
                  users={users}
                  editingUser={editingUser}
                  userEdit={userEdit}
                  setUserEdit={setUserEdit}
                  startEditUser={startEditUser}
                  saveEditUser={saveEditUser}
                  setEditingUser={setEditingUser}
                  deleteUser={deleteUser}
                />
              )}
              {section === 'articles' && (
                <AdminDashboardArticles 
                  articles={articles}
                  editingArticle={editingArticle}
                  articleEdit={articleEdit}
                  setArticleEdit={setArticleEdit}
                  startEditArticle={startEditArticle}
                  saveEditArticle={saveEditArticle}
                  setEditingArticle={setEditingArticle}
                  deleteArticle={deleteArticle}
                  newArticle={newArticle}
                  setNewArticle={setNewArticle}
                  addArticle={addArticle}
                />
              )}
              {section === 'doctors' && (
                <AdminDashboardDoctors 
                  doctors={doctors}
                  editingDoctor={editingDoctor}
                  doctorEdit={doctorEdit}
                  setDoctorEdit={setDoctorEdit}
                  startEditDoctor={startEditDoctor}
                  saveEditDoctor={saveEditDoctor}
                  setEditingDoctor={setEditingDoctor}
                  deleteDoctor={deleteDoctor}
                  newDoctor={newDoctor}
                  setNewDoctor={setNewDoctor}
                  addDoctor={addDoctor}
                />
              )}
              {section === 'analytics' && (
                <AdminDashboardAnalytics 
                  users={users}
                  articles={articles}
                  doctors={doctors}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;