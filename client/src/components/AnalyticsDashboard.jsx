import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for analytics
  const [analyticsData] = useState({
    healthScore: {
      current: 85,
      previous: 78,
      trend: 'up',
      history: [75, 76, 78, 80, 82, 84, 85]
    },
    vitals: {
      weight: {
        current: 70,
        target: 68,
        history: [72, 71.5, 71, 70.5, 70.2, 70, 70],
        unit: 'kg'
      },
      bloodPressure: {
        systolic: [120, 118, 122, 119, 121, 120, 118],
        diastolic: [80, 78, 82, 79, 81, 80, 78]
      },
      heartRate: {
        resting: [72, 70, 74, 71, 73, 72, 70],
        average: 72
      }
    },
    activities: {
      steps: {
        daily: [8500, 9200, 7800, 10500, 9800, 8900, 10200],
        target: 10000,
        average: 9286
      },
      exercise: {
        minutes: [30, 45, 0, 60, 30, 45, 40],
        target: 150, // weekly
        total: 250
      },
      sleep: {
        hours: [7.2, 6.8, 8.1, 7.5, 6.9, 8.2, 7.8],
        target: 8,
        average: 7.5
      },
      water: {
        glasses: [6, 8, 7, 9, 8, 6, 7],
        target: 8,
        average: 7.3
      }
    },
    medications: {
      adherence: 85, // percentage
      missed: 3,
      taken: 18,
      total: 21
    },
    mood: {
      average: 7.2,
      history: [6, 7, 8, 7, 8, 7, 8],
      trend: 'stable'
    },
    goals: {
      completed: 15,
      total: 20,
      completionRate: 75
    }
  });

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'vitals', label: 'Vitals' },
    { value: 'activities', label: 'Activities' },
    { value: 'mood', label: 'Mood & Wellness' },
    { value: 'medications', label: 'Medications' }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-neutral-600';
    }
  };

  const calculatePercentageChange = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-7xl mt-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4 md:mb-0">Health Analytics</h2>
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input input-dark"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input input-dark"
            >
              {metrics.map(metric => (
                <option key={metric.value} value={metric.value}>{metric.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Health Score Overview */}
        <div className="card card-alt p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-primary">Overall Health Score</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{analyticsData.healthScore.current}</span>
              <span className="text-lg text-neutral-500">/100</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className={getTrendColor(analyticsData.healthScore.trend)}>
                {getTrendIcon(analyticsData.healthScore.trend)}
              </span>
              <span className={`font-medium ${getTrendColor(analyticsData.healthScore.trend)}`}>
                {calculatePercentageChange(analyticsData.healthScore.current, analyticsData.healthScore.previous)}%
              </span>
              <span className="text-neutral-500">vs last period</span>
            </div>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${analyticsData.healthScore.current}%` }}
            ></div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Steps */}
          <div className="card card-alt p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-primary">Daily Steps</h4>
              <span className="text-2xl">👟</span>
            </div>
            <div className="text-2xl font-bold mb-1">{analyticsData.activities.steps.average.toLocaleString()}</div>
            <div className="text-sm text-neutral-600 mb-2">
              Target: {analyticsData.activities.steps.target.toLocaleString()}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(analyticsData.activities.steps.average, analyticsData.activities.steps.target)}`}
                style={{ width: `${Math.min((analyticsData.activities.steps.average / analyticsData.activities.steps.target) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Sleep */}
          <div className="card card-alt p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-primary">Sleep Quality</h4>
              <span className="text-2xl">😴</span>
            </div>
            <div className="text-2xl font-bold mb-1">{analyticsData.activities.sleep.average}h</div>
            <div className="text-sm text-neutral-600 mb-2">
              Target: {analyticsData.activities.sleep.target}h
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(analyticsData.activities.sleep.average, analyticsData.activities.sleep.target)}`}
                style={{ width: `${Math.min((analyticsData.activities.sleep.average / analyticsData.activities.sleep.target) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Medication Adherence */}
          <div className="card card-alt p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-primary">Med Adherence</h4>
              <span className="text-2xl">💊</span>
            </div>
            <div className="text-2xl font-bold mb-1">{analyticsData.medications.adherence}%</div>
            <div className="text-sm text-neutral-600 mb-2">
              {analyticsData.medications.taken}/{analyticsData.medications.total} taken
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(analyticsData.medications.adherence, 100)}`}
                style={{ width: `${analyticsData.medications.adherence}%` }}
              ></div>
            </div>
          </div>

          {/* Goal Completion */}
          <div className="card card-alt p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-primary">Goals</h4>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-2xl font-bold mb-1">{analyticsData.goals.completionRate}%</div>
            <div className="text-sm text-neutral-600 mb-2">
              {analyticsData.goals.completed}/{analyticsData.goals.total} completed
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(analyticsData.goals.completionRate, 100)}`}
                style={{ width: `${analyticsData.goals.completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Detailed Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weight Trend */}
          <div className="card card-alt p-6">
            <h3 className="text-lg font-semibold mb-4 text-primary">Weight Trend</h3>
            <div className="flex items-end h-40 gap-2">
              {analyticsData.vitals.weight.history.map((weight, idx) => {
                const maxWeight = Math.max(...analyticsData.vitals.weight.history);
                const minWeight = Math.min(...analyticsData.vitals.weight.history);
                const height = ((weight - minWeight) / (maxWeight - minWeight)) * 100 + 20;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-neutral-600 mb-1">{weight}kg</div>
                    <div 
                      className="bg-gradient-to-t from-primary to-secondary rounded-md w-full transition-all duration-500" 
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="text-neutral-500 text-xs mt-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-neutral-600">
                Target: {analyticsData.vitals.weight.target}kg | 
                Current: {analyticsData.vitals.weight.current}kg
              </span>
            </div>
          </div>

          {/* Mood Tracking */}
          <div className="card card-alt p-6">
            <h3 className="text-lg font-semibold mb-4 text-primary">Mood Tracking</h3>
            <div className="flex items-end h-40 gap-2">
              {analyticsData.mood.history.map((mood, idx) => {
                const height = (mood / 10) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-neutral-600 mb-1">{mood}/10</div>
                    <div 
                      className="bg-gradient-to-t from-purple-400 to-purple-600 rounded-md w-full transition-all duration-500" 
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="text-neutral-500 text-xs mt-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-neutral-600">
                Average: {analyticsData.mood.average}/10 | 
                Trend: {analyticsData.mood.trend}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="card card-alt p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">Weekly Activity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚶‍♂️</div>
              <div className="text-2xl font-bold text-primary">{analyticsData.activities.steps.daily.reduce((a, b) => a + b, 0).toLocaleString()}</div>
              <div className="text-sm text-neutral-600">Total Steps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💪</div>
              <div className="text-2xl font-bold text-primary">{analyticsData.activities.exercise.total}</div>
              <div className="text-sm text-neutral-600">Exercise Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💧</div>
              <div className="text-2xl font-bold text-primary">{analyticsData.activities.water.glasses.reduce((a, b) => a + b, 0)}</div>
              <div className="text-sm text-neutral-600">Glasses of Water</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😴</div>
              <div className="text-2xl font-bold text-primary">{analyticsData.activities.sleep.hours.reduce((a, b) => a + b, 0).toFixed(1)}</div>
              <div className="text-sm text-neutral-600">Hours of Sleep</div>
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <div className="card card-alt p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">Health Insights & Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <span className="text-green-600 text-xl">✅</span>
              <div>
                <div className="font-medium text-green-800">Great Progress!</div>
                <div className="text-sm text-green-700">Your health score improved by 9% this week. Keep up the excellent work!</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div>
                <div className="font-medium text-yellow-800">Attention Needed</div>
                <div className="text-sm text-yellow-700">You've missed 3 medication doses this week. Consider setting more reminders.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <span className="text-blue-600 text-xl">💡</span>
              <div>
                <div className="font-medium text-blue-800">Suggestion</div>
                <div className="text-sm text-blue-700">Try to increase your daily water intake by 1 glass to reach your target consistently.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;