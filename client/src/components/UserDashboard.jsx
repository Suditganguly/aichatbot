import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

// Initial user data - now editable
const initialUser = { 
  name: 'Sudit', 
  age: 25, 
  weight: 70, 
  height: 175, 
  bloodType: 'O+',
  lastCheckup: '2024-01-15',
  healthScore: 85
};

const healthTips = [
  'Stay hydrated throughout the day.',
  'Take regular breaks from screens.',
  'Eat 5 servings of fruits/vegetables.',
  'Practice deep breathing exercises.',
  'Maintain good posture while working.',
];

const reminders = [
  { name: 'Vitamin D', time: '09:00', notes: 'After breakfast', taken: true, frequency: 'Daily' },
  { name: 'Blood Pressure Med', time: '20:00', notes: 'Before dinner', taken: false, frequency: 'Daily' },
  { name: 'Omega-3', time: '12:00', notes: 'With lunch', taken: true, frequency: 'Daily' },
  { name: 'Calcium', time: '22:00', notes: 'Before bed', taken: false, frequency: 'Daily' },
];

const initialGoals = [
  { text: 'Walk 10,000 steps', done: true, progress: 8500, target: 10000 },
  { text: 'Drink 8 glasses of water', done: false, progress: 5, target: 8 },
  { text: 'Sleep at least 7 hours', done: true, progress: 7.5, target: 7 },
  { text: 'Meditate for 15 minutes', done: false, progress: 8, target: 15 },
  { text: 'Eat 5 servings of fruits/vegetables', done: true, progress: 6, target: 5 },
];

const initialVitalSigns = [
  { name: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal', icon: '💓' },
  { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: '🩸' },
  { name: 'Temperature', value: 98.6, unit: '°F', status: 'normal', icon: '🌡️' },
  { name: 'Weight', value: 70, unit: 'kg', status: 'stable', icon: '⚖️' },
];

const weeklyStats = {
  steps: [8500, 9200, 7800, 10500, 9800, 8900, 10200],
  water: [6, 8, 7, 9, 8, 6, 7],
  sleep: [7.2, 6.8, 8.1, 7.5, 6.9, 8.2, 7.8],
  exercise: [30, 45, 0, 60, 30, 45, 40]
};

const upcomingAppointments = [
  { doctor: 'Dr. Smith', specialty: 'Cardiologist', date: '2024-02-15', time: '10:00 AM' },
  { doctor: 'Dr. Johnson', specialty: 'Dentist', date: '2024-02-20', time: '2:30 PM' },
  { doctor: 'Dr. Brown', specialty: 'General Physician', date: '2024-03-01', time: '11:15 AM' },
];

const healthInsights = [
  { type: 'positive', message: 'Great job! You\'ve been consistent with your walking routine this week.' },
  { type: 'warning', message: 'Your water intake has been below target for 3 days. Try to increase hydration.' },
  { type: 'info', message: 'Your sleep quality has improved by 15% compared to last month.' },
  { type: 'reminder', message: 'It\'s been 6 months since your last health checkup. Consider scheduling one.' },
];

const nextReminder = reminders.find(r => !r.taken) || reminders[0];
const remindersTaken = reminders.filter(r => r.taken).length;
const remindersMissed = reminders.length - remindersTaken;

const recentActivity = [
  { time: '09:00', desc: 'Took Vitamin D', type: 'medicine' },
  { time: '08:30', desc: 'Completed: Walk 10,000 steps', type: 'goal' },
  { time: '08:00', desc: 'Logged weight: 70kg', type: 'vital' },
  { time: 'Yesterday 22:30', desc: 'Completed: Sleep 7.5 hours', type: 'goal' },
  { time: 'Yesterday 20:00', desc: 'Missed: Blood Pressure Med', type: 'missed' },
  { time: 'Yesterday 18:00', desc: 'Completed workout: 45 minutes', type: 'exercise' },
];

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingVitals, setEditingVitals] = useState(false);
  const [newGoal, setNewGoal] = useState({ text: '', target: '' });
  
  // Use centralized user data
  const { 
    userData, 
    derivedData,
    updateProfile, 
    updateVitals, 
    addGoal, 
    toggleGoal, 
    deleteGoal 
  } = useUser();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handler functions
  const handleUserUpdate = (field, value) => {
    updateProfile({ [field]: value });
  };

  const handleVitalUpdate = (index, value) => {
    updateVitals(index, value);
  };

  const handleAddGoal = () => {
    if (newGoal.text && newGoal.target) {
      addGoal({
        text: newGoal.text,
        target: parseInt(newGoal.target)
      });
      setNewGoal({ text: '', target: '' });
    }
  };

  const handleToggleGoal = (goalId) => {
    toggleGoal(goalId);
  };

  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId);
  };

  const getBMI = () => {
    const heightInM = userData.profile.height / 100;
    return (userData.profile.weight / (heightInM * heightInM)).toFixed(1);
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'medicine': return '💊';
      case 'goal': return '🎯';
      case 'vital': return '📊';
      case 'exercise': return '💪';
      case 'missed': return '⚠️';
      default: return '📝';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 mb-1">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Welcome back, {userData.profile.name}! 👋</h2>
          </div>
          <p style={{ color: '#fff', fontWeight: 600, textShadow: '0 1px 4px #000' }} className="text-base md:text-lg">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p style={{ color: '#b3e5fc', fontWeight: 600, textShadow: '0 1px 4px #000' }} className="text-xs md:text-sm">
            Current time: {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-4">
          <div
            className={`text-2xl md:text-3xl font-bold flex items-center justify-center shadow-lg border-2 ${getHealthScoreColor(userData.profile.healthScore)}`}
            style={{
              background: 'rgba(30, 30, 30, 0.85)',
              borderRadius: '1.5rem',
              borderColor: '#fff',
              color: '#fff',
              minWidth: '90px',
              minHeight: '60px',
              padding: '0.5rem 1.5rem',
              textShadow: '0 2px 8px #000, 0 0 2px #fff',
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25), 0 1.5px 0 #fff inset',
              letterSpacing: '1px',
              fontWeight: 900,
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            {userData.profile.healthScore}/100
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card card-stat p-4 flex flex-col items-center">
          <div className="text-lg font-semibold">BMI</div>
          <div className="text-2xl font-bold">{getBMI()}</div>
          <div className="text-xs text-neutral-500">Height: {userData.profile.height}cm, Weight: {userData.profile.weight}kg</div>
        </div>
        <div className="card card-stat p-4 flex flex-col items-center">
          <div className="text-lg font-semibold">Blood Type</div>
          <div className="text-2xl font-bold">{userData.profile.bloodType}</div>
          <div className="text-xs text-neutral-500">Last checkup: {userData.profile.lastCheckup}</div>
        </div>
        <div className="card card-stat p-4 flex flex-col items-center">
          <div className="text-lg font-semibold">Goals Today</div>
          <div className="text-2xl font-bold">{derivedData.completedGoals}/{derivedData.totalGoals}</div>
          <div className="text-xs text-neutral-500">{derivedData.goalCompletionRate}% completion</div>
        </div>
        <div className="card card-stat p-4 flex flex-col items-center">
          <div className="text-lg font-semibold">Medicines Taken</div>
          <div className="text-2xl font-bold text-green-600">{derivedData.takenMedications}</div>
          <div className="text-xs text-neutral-500">Missed: {derivedData.totalMedications - derivedData.takenMedications}</div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Vitals */}
        <div className="card card-gradient p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-primary">📊 Vitals</h3>
            <button 
              onClick={() => setEditingVitals(!editingVitals)}
              className="btn btn-outline btn-xs"
            >
              {editingVitals ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {userData.healthData.vitals.map((vital, idx) => (
              <div key={idx} className="card card-stat flex flex-col items-center p-2">
                <div className="text-xl">{vital.icon}</div>
                {editingVitals ? (
                  <input
                    type="text"
                    value={vital.value}
                    onChange={(e) => handleVitalUpdate(idx, e.target.value)}
                    className="input input-dark text-center w-20 h-8 text-sm mb-1"
                  />
                ) : (
                  <div className="font-bold">{vital.value} <span className="text-xs text-neutral-500">{vital.unit}</span></div>
                )}
                <div className="text-xs text-neutral-600">{vital.name}</div>
                <div className={`mt-1 text-xs px-2 py-1 rounded-full ${
                  vital.status === 'normal' ? 'bg-green-100 text-green-800' :
                  vital.status === 'stable' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {vital.status}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Goals */}
        <div className="card card-gradient p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-primary">🎯 Goals</h3>
          
          {/* Add New Goal */}
          <div className="mb-3 p-2 bg-neutral-50 rounded-lg">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="New goal..."
                value={newGoal.text}
                onChange={(e) => setNewGoal({...newGoal, text: e.target.value})}
                className="input input-dark flex-1 h-8 text-sm"
              />
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                className="input input-dark w-20 h-8 text-sm"
              />
            </div>
            <button onClick={handleAddGoal} className="btn btn-primary btn-xs w-full">
              Add Goal
            </button>
          </div>

          <div className="space-y-2">
            {userData.healthData.goals.map((goal, idx) => (
              <div key={idx} className="flex justify-between items-center bg-neutral-50 rounded-lg p-2">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => handleToggleGoal(goal.id)}
                    className="w-4 h-4"
                  />
                  <span className={`font-medium ${goal.done ? 'line-through text-neutral-500' : ''}`}>
                    {goal.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${goal.done ? 'text-green-600' : 'text-neutral-600'}`}>
                    {goal.progress}/{goal.target} {goal.done ? '✅' : '⏳'}
                  </span>
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Reminders */}
        <div className="card card-gradient p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-primary">💊 Reminders</h3>
          <div className="space-y-2">
            {userData.healthData.medications.map((reminder, idx) => (
              <div key={idx} className={`flex justify-between items-center rounded-lg p-2 border-l-4 ${
                reminder.taken ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              }`}>
                <div>
                  <div className="font-medium">{reminder.name}</div>
                  <div className="text-xs text-neutral-600">{reminder.time} - {reminder.notes}</div>
                </div>
                <div className="text-xl">{reminder.taken ? '✅' : '⏰'}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Appointments */}
        <div className="card card-gradient p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-primary">🏥 Appointments</h3>
          <div className="space-y-2">
            {upcomingAppointments.map((apt, idx) => (
              <div key={idx} className="flex flex-col rounded-lg p-2 bg-white bg-opacity-50">
                <div className="font-medium text-primary">{apt.doctor}</div>
                <div className="text-xs text-neutral-600">{apt.specialty}</div>
                <div className="text-xs font-medium">{apt.date} at {apt.time}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Health Insights */}
        <div className="card card-gradient p-4 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold mb-2 text-primary">🔎 Health Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {healthInsights.map((insight, idx) => (
              <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                insight.type === 'positive' ? 'bg-green-50 border-green-500' :
                insight.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                insight.type === 'info' ? 'bg-blue-50 border-blue-500' :
                'bg-purple-50 border-purple-500'
              }`}>
                <p className="text-xs">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Weekly Analytics */}
        <div className="card card-gradient p-4 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold mb-2 text-primary">📈 Weekly Analytics</h3>
          <div className="flex gap-2 mb-4">
            {['steps', 'water', 'sleep', 'exercise'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg font-medium transition-all text-xs md:text-sm ${
                  selectedMetric === metric 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-end h-32 gap-2 px-2">
            {userData.healthData.weeklyStats[selectedMetric].map((val, idx) => {
              const maxVal = Math.max(...userData.healthData.weeklyStats[selectedMetric]);
              const height = (val / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-neutral-600 mb-1">{val}</div>
                  <div 
                    className="bg-gradient-to-t from-primary to-secondary rounded-md w-full transition-all duration-500 hover:opacity-80" 
                    style={{ height: `${height}px` }}
                  ></div>
                  <div className="text-neutral-500 text-xs mt-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Recent Activity */}
        <div className="card card-gradient p-4 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold mb-2 text-primary">📋 Recent Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-white bg-opacity-30 rounded-lg">
                <div className="text-xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-xs md:text-sm">{activity.desc}</div>
                  <div className="text-xs text-neutral-600">{activity.time}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  activity.type === 'missed' ? 'bg-red-100 text-red-800' :
                  activity.type === 'goal' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {activity.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Motivational Section */}
      <div className="card glass-card text-center p-6 md:p-8 animate-slideInUp mt-8">
        <div className="text-4xl md:text-6xl mb-2">🌟</div>
        <p className="text-xl md:text-2xl font-semibold text-primary mb-1">
          "Your health journey is a marathon, not a sprint!"
        </p>
        <p className="text-base md:text-lg text-neutral-600">
          You've completed {derivedData.completedGoals} out of {derivedData.totalGoals} goals today. Keep up the great work!
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">{derivedData.takenMedications}</div>
            <div className="text-xs md:text-sm text-neutral-600">Medicines Taken</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{userData.healthData.weeklyStats.steps[6]}</div>
            <div className="text-xs md:text-sm text-neutral-600">Steps Today</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600">{userData.profile.healthScore}</div>
            <div className="text-xs md:text-sm text-neutral-600">Health Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;