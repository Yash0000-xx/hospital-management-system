import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, Clock, Calendar as CalendarIcon, 
  User, CheckCircle2, XCircle, MoreVertical, X 
} from 'lucide-react';

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Real Database State
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '', doctorId: '', date: '', time: '', reason: 'Consultation'
  });

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [apptRes, patientRes, doctorRes] = await Promise.all([
        fetch('http://localhost:5000/api/appointments'),
        fetch('http://localhost:5000/api/patients'),
        fetch('http://localhost:5000/api/doctors')
      ]);
      setAppointments(await apptRes.json());
      setPatients(await patientRes.json());
      setDoctors(await doctorRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // --- ACTIONS ---
  // Note: These just update the UI visually for now since we haven't built PUT/DELETE backend routes yet!
  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely remove this appointment?")) {
      try {
        // Tell the backend to delete it
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove it from the screen
          setAppointments(appointments.filter(apt => apt.id !== id));
          
          // Optional: Refresh the dashboard stats in the background if you want
          fetchAllData(); 
        } else {
          alert("Failed to delete appointment from database.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  // --- MODAL FUNCTIONS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchAllData(); // Refresh the list to get the new nested names!
        setIsModalOpen(false);
        setFormData({ patientId: '', doctorId: '', date: '', time: '', reason: 'Consultation' });
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  // Filter by search term (safely checking nested objects)
  const filteredAppointments = appointments.filter(apt => {
    const patientName = apt.patient?.name || '';
    const doctorName = apt.doctor?.name || '';
    return patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           doctorName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Status Badge Styling Helper
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">Schedule and manage patient visits.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patient or doctor..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <input 
            type="date" 
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Patient Details</th>
                <th className="p-4 font-medium hidden md:table-cell">Doctor & Dept</th>
                <th className="p-4 font-medium hidden lg:table-cell">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors group">
                  
                  {/* Date & Time */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 flex items-center gap-1.5">
                        <Clock size={14} className="text-blue-600" />
                        {apt.time}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                        <CalendarIcon size={14} />
                        {new Date(apt.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{apt.patient?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">ID: {apt.patient?.id ? apt.patient.id.substring(apt.patient.id.length - 4) : '...'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm font-medium text-gray-800">{apt.doctor?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{apt.doctor?.specialization || 'Dept'}</p>
                  </td>

                  {/* Type */}
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                      {apt.reason}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>

                  {/* Actions (Quick Toggles) */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {apt.status === 'Scheduled' && (
                        <>
                          <button onClick={() => handleStatusChange(apt.id, 'Completed')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Mark Completed">
                            <CheckCircle2 size={18} />
                          </button>
                          <button onClick={() => handleStatusChange(apt.id, 'Cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Cancel Appointment">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(apt.id)} className="p-1.5 text-gray-400 hover:text-gray-800 transition-colors" title="Options">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAppointments.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No appointments scheduled. Click "Book Appointment" to add one!
            </div>
          )}
        </div>
      </div>

      {/* --- BOOKING MODAL OVERLAY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Book Appointment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-sm">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Dynamic Patient Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Patient</label>
                <select 
                  required name="patientId"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={formData.patientId} onChange={handleInputChange}
                >
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Doctor Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Doctor</label>
                <select 
                  required name="doctorId"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={formData.doctorId} onChange={handleInputChange}
                >
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input 
                    required type="date" name="date"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    value={formData.date} onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                  <input 
                    required type="time" name="time"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    value={formData.time} onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Type</label>
                <select 
                  name="reason"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={formData.reason} onChange={handleInputChange}
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Checkup">General Checkup</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Test Results">Test Results</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}