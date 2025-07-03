import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const ProfileSettings = () => {
  const { userData, updateProfile, updateProfileSection } = useUser();

  const [activeTab, setActiveTab] = useState('personal');
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');

  const handleInputChange = (section, field, value) => {
    if (section) {
      updateProfileSection(section, { [field]: value });
    } else {
      updateProfile({ [field]: value });
    }
  };

  const addToArray = (field, value, setter) => {
    if (value.trim()) {
      const currentArray = userData.profile[field] || [];
      updateProfile({ [field]: [...currentArray, value.trim()] });
      setter('');
    }
  };

  const removeFromArray = (field, index) => {
    const currentArray = userData.profile[field] || [];
    updateProfile({ [field]: currentArray.filter((_, i) => i !== index) });
  };

  const calculateBMI = () => {
    const heightInM = userData.profile.height / 100;
    return (userData.profile.weight / (heightInM * heightInM)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'medical', label: 'Medical Info', icon: '🏥' },
    { id: 'emergency', label: 'Emergency Contact', icon: '🚨' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'goals', label: 'Health Goals', icon: '🎯' }
  ];

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-6xl mt-8 p-4 md:p-8">
        <h2 className="mb-6 text-primary text-2xl md:text-3xl font-bold">Profile Settings</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white border-b-2 border-primary' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={userData.profile.name}
                  onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                  className="input input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={userData.profile.email}
                  onChange={(e) => handleInputChange(null, 'email', e.target.value)}
                  className="input input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={userData.profile.phone}
                  onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                  className="input input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={userData.profile.dateOfBirth}
                  onChange={(e) => handleInputChange(null, 'dateOfBirth', e.target.value)}
                  className="input input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  value={userData.profile.gender}
                  onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
                  className="input input-dark w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blood Type</label>
                <select
                  value={userData.profile.bloodType}
                  onChange={(e) => handleInputChange(null, 'bloodType', e.target.value)}
                  className="input input-dark w-full"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* Physical Stats */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Physical Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={userData.profile.weight}
                    onChange={(e) => handleInputChange(null, 'weight', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={userData.profile.height}
                    onChange={(e) => handleInputChange(null, 'height', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">BMI</label>
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <div className="text-lg font-bold">{calculateBMI()}</div>
                    <div className={`text-sm ${getBMICategory(calculateBMI()).color}`}>
                      {getBMICategory(calculateBMI()).category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical Information Tab */}
        {activeTab === 'medical' && (
          <div className="space-y-6">
            {/* Allergies */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Allergies</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add new allergy..."
                  className="input input-dark flex-1"
                />
                <button 
                  onClick={() => addToArray('allergies', newAllergy, setNewAllergy)}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.profile.allergies.map((allergy, index) => (
                  <span key={index} className="badge badge-secondary flex items-center gap-1">
                    {allergy}
                    <button 
                      onClick={() => removeFromArray('allergies', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Chronic Conditions</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add chronic condition..."
                  className="input input-dark flex-1"
                />
                <button 
                  onClick={() => addToArray('chronicConditions', newCondition, setNewCondition)}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.profile.chronicConditions.map((condition, index) => (
                  <span key={index} className="badge badge-warning flex items-center gap-1">
                    {condition}
                    <button 
                      onClick={() => removeFromArray('chronicConditions', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Current Medications</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  placeholder="Add medication..."
                  className="input input-dark flex-1"
                />
                <button 
                  onClick={() => addToArray('currentMedications', newMedication, setNewMedication)}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.profile.currentMedications.map((medication, index) => (
                  <span key={index} className="badge badge-info flex items-center gap-1">
                    {medication}
                    <button 
                      onClick={() => removeFromArray('currentMedications', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium mb-1">Medical History</label>
              <textarea
                value={userData.profile.medicalHistory}
                onChange={(e) => handleInputChange(null, 'medicalHistory', e.target.value)}
                rows={4}
                className="input input-dark w-full"
                placeholder="Describe your medical history, surgeries, etc."
              />
            </div>
          </div>
        )}

        {/* Emergency Contact Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Emergency Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={userData.profile.emergencyContact.name}
                    onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship</label>
                  <input
                    type="text"
                    value={userData.profile.emergencyContact.relationship}
                    onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
                    className="input input-dark w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={userData.profile.emergencyContact.phone}
                    onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                    className="input input-dark w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* Units */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Measurement Units</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="units"
                    value="metric"
                    checked={userData.profile.units === 'metric'}
                    onChange={(e) => handleInputChange(null, 'units', e.target.value)}
                  />
                  Metric (kg, cm)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="units"
                    value="imperial"
                    checked={userData.profile.units === 'imperial'}
                    onChange={(e) => handleInputChange(null, 'units', e.target.value)}
                  />
                  Imperial (lbs, ft)
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Notification Preferences</h3>
              <div className="space-y-3">
                {Object.entries(userData.profile.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Health Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="card card-alt p-4">
              <h3 className="text-lg font-semibold mb-3 text-primary">Health Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Target Weight (kg)</label>
                  <input
                    type="number"
                    value={userData.profile.healthGoals.targetWeight}
                    onChange={(e) => handleInputChange('healthGoals', 'targetWeight', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Daily Steps Goal</label>
                  <input
                    type="number"
                    value={userData.profile.healthGoals.dailySteps}
                    onChange={(e) => handleInputChange('healthGoals', 'dailySteps', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sleep Hours Goal</label>
                  <input
                    type="number"
                    value={userData.profile.healthGoals.sleepHours}
                    onChange={(e) => handleInputChange('healthGoals', 'sleepHours', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Daily Water Intake (glasses)</label>
                  <input
                    type="number"
                    value={userData.profile.healthGoals.waterIntake}
                    onChange={(e) => handleInputChange('healthGoals', 'waterIntake', parseInt(e.target.value))}
                    className="input input-dark w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button className="btn btn-primary btn-lg">
            Save Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;