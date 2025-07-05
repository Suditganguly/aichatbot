import React, { useState } from 'react';

const specialtyIcons = {
  'General Physician': '🩺',
  'Cardiologist': '❤️',
  'Dermatologist': '🧴',
  'Pediatrician': '👶',
  'Gynecologist': '👩‍⚕️',
};

const mockDoctors = [
  {
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    location: 'Kolkata',
    rating: 4.8,
    reviews: 32,
  },
  {
    name: 'Dr. Arjun Mehta',
    specialty: 'Cardiologist',
    location: 'Delhi',
    rating: 4.6,
    reviews: 21,
  },
  {
    name: 'Dr. Sneha Kapoor',
    specialty: 'Dermatologist',
    location: 'Mumbai',
    rating: 4.9,
    reviews: 40,
  },
  {
    name: 'Dr. Rahul Verma',
    specialty: 'Pediatrician',
    location: 'Bangalore',
    rating: 4.7,
    reviews: 28,
  },
  {
    name: 'Dr. Anjali Singh',
    specialty: 'Gynecologist',
    location: 'Chennai',
    rating: 4.5,
    reviews: 19,
  },
];

const DoctorFinder = () => {
  const [query, setQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: '',
    symptoms: '',
    urgency: 'routine',
    patientName: '',
    phone: '',
    email: ''
  });

  const filtered = mockDoctors.filter(doc =>
    doc.location.toLowerCase().includes(query.toLowerCase()) ||
    doc.name.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(query.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
    setBookingForm({
      ...bookingForm,
      patientName: 'Sudit', // Pre-fill with current user
      email: 'sudit@health.com'
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      ...bookingForm,
      status: 'pending',
      bookedAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setBookingForm({
      date: '',
      time: '',
      reason: '',
      symptoms: '',
      urgency: 'routine',
      patientName: '',
      phone: '',
      email: ''
    });
    alert('Appointment booked successfully!');
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-6xl mt-8 p-4 md:p-8">
        <h2 className="mb-4 text-primary text-2xl md:text-3xl font-bold">Find a Doctor</h2>
        
        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by city, name, or specialty..."
          className="input input-dark w-full max-w-lg mb-6"
        />

        {/* My Appointments */}
        {appointments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">My Appointments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {appointments.map(apt => (
                <div key={apt.id} className="card card-alt p-4 border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg">{apt.doctor.name}</div>
                      <div className="text-neutral-600">{apt.doctor.specialty}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-600 mb-2">
                    <div>📅 {apt.date} at {apt.time}</div>
                    <div>📍 {apt.doctor.location}</div>
                    <div>📝 {apt.reason}</div>
                  </div>
                  <button 
                    onClick={() => cancelAppointment(apt.id)}
                    className="btn btn-outline btn-sm text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctor List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-neutral-500 italic">No doctors found for your search.</div>
          ) : (
            filtered.map((doc, idx) => (
              <div key={idx} className="card card-alt flex flex-col gap-2 p-4 h-full shadow-sm border border-neutral-200 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{specialtyIcons[doc.specialty] || '👨‍⚕️'}</span>
                  <span className="font-bold text-lg text-primary">{doc.name}</span>
                </div>
                <div className="text-neutral-700 text-base">{doc.specialty}</div>
                <div className="text-neutral-500 text-sm">📍 {doc.location}</div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <span>Rating: <b className="text-green-700">{doc.rating}★</b></span>
                  <span>({doc.reviews} reviews)</span>
                </div>
                <button 
                  onClick={() => handleBookAppointment(doc)}
                  className="btn btn-primary btn-sm mt-auto"
                >
                  Book Appointment
                </button>
              </div>
            ))
          )}
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="card card-gradient max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary">Book Appointment</h3>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-neutral-500 hover:text-neutral-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {selectedDoctor && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{specialtyIcons[selectedDoctor.specialty] || '👨‍⚕️'}</span>
                    <span className="font-bold">{selectedDoctor.name}</span>
                  </div>
                  <div className="text-sm text-neutral-600">
                    {selectedDoctor.specialty} • {selectedDoctor.location}
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={bookingForm.patientName}
                      onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                      className="input input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="input input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="input input-dark w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Urgency</label>
                    <select
                      value={bookingForm.urgency}
                      onChange={(e) => setBookingForm({...bookingForm, urgency: e.target.value})}
                      className="input input-dark w-full"
                    >
                      <option value="routine">Routine</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="input input-dark w-full"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Time</label>
                    <input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      className="input input-dark w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Visit</label>
                  <input
                    type="text"
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                    placeholder="e.g., Regular checkup, Follow-up, Consultation"
                    className="input input-dark w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Symptoms/Concerns (Optional)</label>
                  <textarea
                    value={bookingForm.symptoms}
                    onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                    placeholder="Describe any symptoms or specific concerns..."
                    rows={3}
                    className="input input-dark w-full"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Book Appointment
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFinder;