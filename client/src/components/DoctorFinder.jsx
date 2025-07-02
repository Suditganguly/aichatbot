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
  const filtered = mockDoctors.filter(doc =>
    doc.location.toLowerCase().includes(query.toLowerCase()) ||
    doc.name.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center items-start p-4 md:p-8">
      <div className="card card-gradient w-full max-w-4xl mt-8 p-4 md:p-8">
        <h2 className="mb-4 text-primary text-2xl md:text-3xl font-bold">Find a Doctor</h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by city, name, or specialty..."
          className="input input-dark w-full max-w-lg mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-neutral-500 italic">No doctors found for your search.</div>
          ) : (
            filtered.map((doc, idx) => (
              <div key={idx} className="card card-alt flex flex-col gap-2 p-4 h-full shadow-sm border border-neutral-200 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{specialtyIcons[doc.specialty] || '👨‍⚕️'}</span>
                  <span className="font-bold text-lg text-primary">{doc.name}</span>
                </div>
                <div className="text-neutral-700 text-base">{doc.specialty} <span className="text-neutral-400">&mdash; {doc.location}</span></div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span>Rating: <b className="text-green-700">{doc.rating}★</b></span>
                  <span>({doc.reviews} reviews)</span>
                </div>
                <button className="btn btn-primary btn-sm mt-2 self-end">Book</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;