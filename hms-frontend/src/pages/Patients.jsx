import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Filter, Edit, Trash2, X, Loader2 } from 'lucide-react';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', phone: '', status: 'Active'
  });

  // --- FETCH DATA FROM SERVER ON LOAD ---
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/patients');
      if (!response.ok) throw new Error('Failed to fetch patients');
      
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- MODAL FUNCTIONS ---
  const openModal = (patient = null) => {
    if (patient) {
      setFormData(patient);
      setEditingId(patient.id);
    } else {
      setFormData({ name: '', age: '', gender: 'Male', phone: '', status: 'Active' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- SEND DATA TO SERVER ON SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      alert("Edit route coming soon!");
    } else {
      // CREATE new patient (REMOVED THE FAKE ID GENERATOR)
      const newPatient = {
        ...formData
      };

      try {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPatient),
        });

        if (response.ok) {
          // If successful, fetch the fresh list from the database to guarantee real IDs
          await fetchPatients();
          closeModal();
        }
      } catch (err) {
        console.error("Error saving patient:", err);
        alert("Failed to save patient to server.");
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      setPatients(patients.filter(patient => patient.id !== id));
      alert("Delete route coming soon! Removed from UI temporarily.");
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (patient.id && patient.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, add, and update patient records.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Top Controls */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm overflow-hidden flex-1 relative">
        
        {/* Loading State UI */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
            <Loader2 size={32} className="text-blue-600 animate-spin mb-2" />
            <p className="text-gray-500 font-medium">Fetching patients from server...</p>
          </div>
        )}

        {/* Error State UI */}
        {error && (
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
            <p className="text-red-500 font-medium mb-2">Error connecting to database:</p>
            <p className="text-gray-600">{error}</p>
            <p className="text-sm text-gray-400 mt-2">Make sure your Express server is running on port 5000!</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Patient Info</th>
                <th className="p-4 font-medium hidden sm:table-cell">Patient ID</th>
                <th className="p-4 font-medium hidden md:table-cell">Contact</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <tr key={patient.id || index} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.age} yrs • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell text-sm text-gray-600 font-medium text-xs">
                    {patient.id ? patient.id.substring(patient.id.length - 6) : '...'}
                  </td>
                  <td className="p-4 hidden md:table-cell text-sm text-gray-600">{patient.phone || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(patient)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(patient.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {!isLoading && filteredPatients.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No patients found.
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Patient' : 'Add New Patient'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleInputChange}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input required type="text" name="age" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.age} onChange={handleInputChange}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select name="gender" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.gender} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input required type="text" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={handleInputChange}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.status} onChange={handleInputChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium">Save Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}