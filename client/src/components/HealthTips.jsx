import React, { useState } from 'react';

const defaultGoals = [
  'Drink 8 glasses of water',
  'Walk 30 minutes',
  'Eat 5 servings of fruits/vegetables',
  'Take deep breaths for 5 minutes',
  'Sleep at least 7 hours'
];

const staticTips = [
  'Stay hydrated throughout the day.',
  'Take regular breaks from screens.',
  'Incorporate more whole foods into your diet.',
  'Practice mindfulness or meditation.',
  'Maintain a consistent sleep schedule.'
];

const HealthTips = () => {
  const [user, setUser] = useState({ name: '', age: '', gender: '' });
  const [goals, setGoals] = useState(defaultGoals.map(g => ({ text: g, done: false })));

  const handleUserChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleGoal = idx => {
    setGoals(goals.map((g, i) => i === idx ? { ...g, done: !g.done } : g));
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px' }}>
      <div className="card card-gradient" style={{ maxWidth: 600, width: '100%', marginTop: 32, minHeight: '520px', padding: '24px' }}>
        <h2 style={{ marginBottom: 24, color: '#1976d2', letterSpacing: 1, fontSize: '28px' }}>Personalized Health Tips & Goals</h2>
        {user.name && (
          <div style={{ fontSize: 20, marginBottom: 24, color: '#333', padding: '16px', background: '#f0f8ff', borderRadius: '12px', border: '1px solid #e3f2fd' }}>Hello, <b>{user.name}</b>! Here are your wellness tips for today:</div>
        )}
        <form style={{ marginBottom: 24, display: 'flex', gap: 10, flexWrap: 'nowrap', alignItems: 'center', background: '#f5f7fa', borderRadius: 10, padding: 10, justifyContent: 'flex-start' }}>
          <input name="name" value={user.name} onChange={handleUserChange} placeholder="Name" className="input input-dark" style={{ width: 300, minWidth: 180, maxWidth: 300, height: '32px', fontSize: '15px', padding: '4px 10px' }} />
          <input name="age" value={user.age} onChange={handleUserChange} placeholder="Age" type="number" className="input input-dark" style={{ width: 80, minWidth: 60, maxWidth: 100, height: '32px', fontSize: '15px', padding: '4px 10px' }} />
          <select name="gender" value={user.gender} onChange={handleUserChange} className="input input-dark" style={{ width: 120, minWidth: 90, maxWidth: 120, padding: '4px 10px', borderRadius: 8, border: '1px solid #bfc7d1', background: user.gender ? '#fff' : '#f5f7fa', color: user.gender ? '#222' : '#bfc7d1', height: '32px', fontSize: '15px' }}>
            <option value="" disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </form>
        <hr style={{ border: 'none', borderTop: '2px solid #e3e3e3', margin: '32px 0 24px 0' }} />
        <div style={{ marginBottom: 20, minHeight: '180px' }}>
          <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '20px' }}>Today's Health Tips</h3>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {staticTips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: 8, color: '#444', fontSize: 16, lineHeight: '1.4', padding: '4px 0' }}>{tip}</li>
            ))}
          </ul>
        </div>
        <hr style={{ border: 'none', borderTop: '2px solid #e3e3e3', margin: '24px 0 24px 0' }} />
        <div style={{ minHeight: '220px' }}>
          <h3 style={{ color: '#1976d2', marginBottom: 12, fontSize: '20px' }}>Daily Wellness Goals</h3>
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
            {goals.map((goal, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', background: goal.done ? '#e3f6e8' : '#f7f7f7', borderRadius: 10, padding: '10px 14px', transition: 'background 0.2s, transform 0.2s', minHeight: '40px' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                  <input type="checkbox" checked={goal.done} onChange={() => toggleGoal(idx)} style={{ marginRight: 10, accentColor: '#1976d2', width: 16, height: 16 }} />
                  <span style={{ textDecoration: goal.done ? 'line-through' : 'none', color: goal.done ? '#1976d2' : '#222', fontWeight: 500, fontSize: 16, lineHeight: '1.4' }}>{goal.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;