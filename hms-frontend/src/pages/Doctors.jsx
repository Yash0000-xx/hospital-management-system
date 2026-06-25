import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Mail, Phone, MapPin, MoreVertical, Star, X } from 'lucide-react';

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]); // Start empty, fetch from database
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state for creating a new doctor
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    status: 'Active'
  });

  // Fetch doctors from the backend when the page loads
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Handle saving the new doctor to the database
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newDoc = await response.json();
        // Update the screen instantly with the new doctor
        setDoctors([newDoc, ...doctors]);
        // Close modal and reset form
        setIsModalOpen(false);
        setFormData({ name: '', specialization: '', phone: '', email: '', status: 'Active' });
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  // Filter logic (using specialization to match the database schema)
  const filteredDoctors = doctors.filter(doc => 
    (doc.name && doc.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (doc.specialization && doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Status Badge Helper
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'In Surgery': return 'bg-red-100 text-red-700';
      case 'Off Duty': return 'bg-gray-100 text-gray-700';
      case 'On Leave': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage hospital staff, specialties, and availability.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
              
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={18} />
                </button>
                <div className="h-20 w-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl mb-4 border-4 border-white shadow-sm">
                  {doc.name ? doc.name.substring(0, 2).toUpperCase() : 'DR'}
                </div>
                <h3 className="font-bold text-lg text-gray-800">{doc.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-2">{doc.specialization}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
                  {doc.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 bg-gray-50/50 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-3 text-gray-400" />
                  {doc.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  <span className="truncate">{doc.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            No doctors found matching your search. Try adding one!
          </div>
        )}
      </div>

      {/* --- THE MISSING MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Add New Doctor</h2>
            
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" required 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="Dr. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input 
                  type="text" required 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.specialization} 
                  onChange={e => setFormData({...formData, specialization: e.target.value})} 
                  placeholder="e.g. Cardiology"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" required 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" required 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  placeholder="doctor@hospital.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <select 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}