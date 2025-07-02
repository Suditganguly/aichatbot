import React, { useState } from 'react';

const AdminDashboardUsers = ({ users, editingUser, userEdit, setUserEdit, startEditUser, saveEditUser, setEditingUser, deleteUser }) => {
  // Summary stats
  const totalUsers = users.length;
  const usersWithReminders = users.filter(u => u.reminders > 0).length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  // Search/filter
  const [search, setSearch] = useState('');
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-slideInUp">
      <h2 className="text-2xl font-bold text-primary mb-6">All Users</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 flex flex-col items-center">
          <span className="text-lg font-semibold text-primary">Total Users</span>
          <span className="text-2xl font-bold">{totalUsers}</span>
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <span className="text-lg font-semibold text-primary">Active Users</span>
          <span className="text-2xl font-bold text-success">{activeUsers}</span>
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <span className="text-lg font-semibold text-primary">With Reminders</span>
          <span className="text-2xl font-bold text-info">{usersWithReminders}</span>
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <span className="text-lg font-semibold text-primary">Admins</span>
          <span className="text-2xl font-bold text-warning">{adminUsers}</span>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-center">
        <input
          className="input-dark w-full md:w-64"
          placeholder="Search users by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="card glass-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 bg-opacity-60 text-white">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Reminders</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Registered</th>
                <th className="p-3 font-semibold">Last Login</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-neutral-800 hover:bg-neutral-800 hover:bg-opacity-40 transition-all">
                  <td className="p-3">
                    {editingUser === user.id ? (
                      <input
                        value={userEdit.name}
                        onChange={e => setUserEdit({ ...userEdit, name: e.target.value })}
                        className="input-dark"
                      />
                    ) : user.name}
                  </td>
                  <td className="p-3">
                    {editingUser === user.id ? (
                      <input
                        value={userEdit.email}
                        onChange={e => setUserEdit({ ...userEdit, email: e.target.value })}
                        className="input-dark"
                      />
                    ) : user.email}
                  </td>
                  <td className="p-3 text-center">
                    <span className="badge badge-info bg-opacity-80">{user.reminders}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`badge ${user.role === 'admin' ? 'badge-warning' : 'badge-secondary'} bg-opacity-80`}>{user.role}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} bg-opacity-80`}>{user.status}</span>
                  </td>
                  <td className="p-3 text-center">
                    {user.registered ? new Date(user.registered).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3 text-center">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3">
                    {editingUser === user.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => saveEditUser(user.id)} className="btn btn-primary btn-xs">Save</button>
                        <button onClick={() => setEditingUser(null)} className="btn btn-ghost btn-xs">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => startEditUser(user)} className="btn btn-outline btn-xs">Edit</button>
                        <button onClick={() => deleteUser(user.id)} className="btn bg-error text-white btn-xs">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
