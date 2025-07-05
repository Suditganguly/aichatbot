import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Centralized user data
  const [userData, setUserData] = useState({
    // Personal Information
    profile: {
      name: 'Sudit',
      email: 'sudit@health.com',
      phone: '+91 9876543210',
      age: 25,
      gender: 'male',
      dateOfBirth: '1999-01-15',
      weight: 70,
      height: 175,
      bloodType: 'O+',
      lastCheckup: '2024-01-15',
      healthScore: 85,
      
      // Medical Information
      allergies: ['Peanuts', 'Shellfish'],
      chronicConditions: ['Hypertension'],
      currentMedications: ['Lisinopril 10mg'],
      medicalHistory: 'No major surgeries. Regular checkups.',
      
      // Emergency Contact
      emergencyContact: {
        name: 'John Doe',
        relationship: 'Brother',
        phone: '+91 9876543211'
      },
      
      // Preferences
      units: 'metric',
      notifications: {
        medicineReminders: true,
        appointmentReminders: true,
        healthTips: true,
        weeklyReports: false
      },
      
      // Health Goals
      healthGoals: {
        targetWeight: 68,
        dailySteps: 10000,
        sleepHours: 8,
        waterIntake: 8
      }
    },

    // Health Data
    healthData: {
      vitals: [
        { name: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal', icon: '💓' },
        { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: '🩸' },
        { name: 'Temperature', value: 98.6, unit: '°F', status: 'normal', icon: '🌡️' },
        { name: 'Weight', value: 70, unit: 'kg', status: 'stable', icon: '⚖️' },
      ],
      
      goals: [
        { id: 1, text: 'Walk 10,000 steps', done: true, progress: 8500, target: 10000 },
        { id: 2, text: 'Drink 8 glasses of water', done: false, progress: 5, target: 8 },
        { id: 3, text: 'Sleep at least 7 hours', done: true, progress: 7.5, target: 7 },
        { id: 4, text: 'Meditate for 15 minutes', done: false, progress: 8, target: 15 },
        { id: 5, text: 'Eat 5 servings of fruits/vegetables', done: true, progress: 6, target: 5 },
      ],

      // Medicine reminders
      medications: [
        { id: 1, name: 'Vitamin D', time: '09:00', notes: 'After breakfast', taken: true, frequency: 'Daily' },
        { id: 2, name: 'Blood Pressure Med', time: '20:00', notes: 'Before dinner', taken: false, frequency: 'Daily' },
        { id: 3, name: 'Omega-3', time: '12:00', notes: 'With lunch', taken: true, frequency: 'Daily' },
        { id: 4, name: 'Calcium', time: '22:00', notes: 'Before bed', taken: false, frequency: 'Daily' },
      ],

      // Health Journal entries
      journalEntries: {},

      // Weekly stats
      weeklyStats: {
        steps: [8500, 9200, 7800, 10500, 9800, 8900, 10200],
        water: [6, 8, 7, 9, 8, 6, 7],
        sleep: [7.2, 6.8, 8.1, 7.5, 6.9, 8.2, 7.8],
        exercise: [30, 45, 0, 60, 30, 45, 40]
      }
    },

    // Appointments
    appointments: [],

    // User-created articles
    userArticles: [],

    // Saved articles
    savedArticles: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthAppUserData');
    const savedAuth = localStorage.getItem('healthAppAuth');
    
    if (savedData && savedAuth) {
      try {
        const parsedData = JSON.parse(savedData);
        const parsedAuth = JSON.parse(savedAuth);
        setUserData(prevData => ({ ...prevData, ...parsedData }));
        setIsAuthenticated(parsedAuth);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever userData changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('healthAppUserData', JSON.stringify(userData));
    }
  }, [userData, isAuthenticated]);

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem('healthAppAuth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Profile update functions
  const updateProfile = (updates) => {
    setUserData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  const updateProfileSection = (section, updates) => {
    setUserData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [section]: { ...prev.profile[section], ...updates }
      }
    }));
  };

  // Health data update functions
  const updateVitals = (index, value) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        vitals: prev.healthData.vitals.map((vital, i) => 
          i === index ? { ...vital, value: value } : vital
        )
      }
    }));
  };

  const updateGoals = (newGoals) => {
    setUserData(prev => ({
      ...prev,
      healthData: { ...prev.healthData, goals: newGoals }
    }));
  };

  const addGoal = (goal) => {
    const newGoal = {
      id: Date.now(),
      ...goal,
      done: false,
      progress: 0
    };
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        goals: [...prev.healthData.goals, newGoal]
      }
    }));
  };

  const toggleGoal = (goalId) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        goals: prev.healthData.goals.map(goal =>
          goal.id === goalId ? { ...goal, done: !goal.done } : goal
        )
      }
    }));
  };

  const deleteGoal = (goalId) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        goals: prev.healthData.goals.filter(goal => goal.id !== goalId)
      }
    }));
  };

  // Medication functions
  const updateMedications = (newMedications) => {
    setUserData(prev => ({
      ...prev,
      healthData: { ...prev.healthData, medications: newMedications }
    }));
  };

  const toggleMedication = (medicationId) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        medications: prev.healthData.medications.map(med =>
          med.id === medicationId ? { ...med, taken: !med.taken } : med
        )
      }
    }));
  };

  const addMedication = (medication) => {
    const newMedication = {
      id: Date.now(),
      ...medication,
      taken: false
    };
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        medications: [...prev.healthData.medications, newMedication]
      }
    }));
  };

  const deleteMedication = (medicationId) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        medications: prev.healthData.medications.filter(med => med.id !== medicationId)
      }
    }));
  };

  // Journal functions
  const updateJournalEntry = (date, entry) => {
    setUserData(prev => ({
      ...prev,
      healthData: {
        ...prev.healthData,
        journalEntries: {
          ...prev.healthData.journalEntries,
          [date]: entry
        }
      }
    }));
  };

  // Appointment functions
  const addAppointment = (appointment) => {
    const newAppointment = {
      id: Date.now(),
      ...appointment,
      status: 'pending',
      bookedAt: new Date().toISOString()
    };
    setUserData(prev => ({
      ...prev,
      appointments: [...prev.appointments, newAppointment]
    }));
  };

  const cancelAppointment = (appointmentId) => {
    setUserData(prev => ({
      ...prev,
      appointments: prev.appointments.filter(apt => apt.id !== appointmentId)
    }));
  };

  // Article functions
  const addUserArticle = (article) => {
    const newArticle = {
      id: Date.now(),
      ...article,
      date: new Date().toISOString().split('T')[0],
      author: userData.profile.name,
      isUserCreated: true
    };
    setUserData(prev => ({
      ...prev,
      userArticles: [newArticle, ...prev.userArticles]
    }));
  };

  const deleteUserArticle = (articleId) => {
    setUserData(prev => ({
      ...prev,
      userArticles: prev.userArticles.filter(article => article.id !== articleId)
    }));
  };

  const saveArticle = (articleId) => {
    setUserData(prev => ({
      ...prev,
      savedArticles: [...prev.savedArticles, articleId]
    }));
  };

  // Authentication functions
  const loginUser = (newUserData) => {
    setUserData(prev => ({ ...prev, ...newUserData }));
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('healthAppUserData');
    localStorage.removeItem('healthAppAuth');
    // Reset to default data
    setUserData({
      profile: {
        name: '',
        email: '',
        phone: '',
        age: 0,
        gender: '',
        dateOfBirth: '',
        weight: 0,
        height: 0,
        bloodType: '',
        lastCheckup: '',
        healthScore: 0,
        allergies: [],
        chronicConditions: [],
        currentMedications: [],
        medicalHistory: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        units: 'metric',
        notifications: {
          medicineReminders: true,
          appointmentReminders: true,
          healthTips: true,
          weeklyReports: false
        },
        healthGoals: {
          targetWeight: 0,
          dailySteps: 10000,
          sleepHours: 8,
          waterIntake: 8
        }
      },
      healthData: {
        vitals: [],
        goals: [],
        medications: [],
        journalEntries: {},
        weeklyStats: {
          steps: [0, 0, 0, 0, 0, 0, 0],
          water: [0, 0, 0, 0, 0, 0, 0],
          sleep: [0, 0, 0, 0, 0, 0, 0],
          exercise: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      appointments: [],
      userArticles: [],
      savedArticles: []
    });
  };

  // Calculate derived values
  const getDerivedData = () => {
    const completedGoals = userData.healthData.goals.filter(g => g.done).length;
    const totalGoals = userData.healthData.goals.length;
    const goalCompletionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
    
    const takenMedications = userData.healthData.medications.filter(m => m.taken).length;
    const totalMedications = userData.healthData.medications.length;
    const medicationAdherence = totalMedications > 0 ? Math.round((takenMedications / totalMedications) * 100) : 100;

    const bmi = userData.profile.height > 0 ? 
      (userData.profile.weight / Math.pow(userData.profile.height / 100, 2)).toFixed(1) : 0;

    return {
      completedGoals,
      totalGoals,
      goalCompletionRate,
      takenMedications,
      totalMedications,
      medicationAdherence,
      bmi
    };
  };

  const contextValue = {
    // Data
    userData,
    derivedData: getDerivedData(),
    isAuthenticated,
    
    // Authentication functions
    loginUser,
    logoutUser,
    
    // Profile functions
    updateProfile,
    updateProfileSection,
    
    // Health data functions
    updateVitals,
    updateGoals,
    addGoal,
    toggleGoal,
    deleteGoal,
    
    // Medication functions
    updateMedications,
    toggleMedication,
    addMedication,
    deleteMedication,
    
    // Journal functions
    updateJournalEntry,
    
    // Appointment functions
    addAppointment,
    cancelAppointment,
    
    // Article functions
    addUserArticle,
    deleteUserArticle,
    saveArticle
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};