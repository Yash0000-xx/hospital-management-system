import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, FileText, FlaskConical, 
  Download, Eye, Activity, CheckCircle2, Clock, X, Loader2 
} from 'lucide-react';

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('records'); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [records, setRecords] = useState([]);
  const [labs, setLabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', diagnosis: '', prescription: '', test: 'Complete Blood Count (CBC)'
  });

  // --- 1. FETCH REAL DATA FROM BACKEND ---
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch both records and labs at the same time
      const [recordsRes, labsRes] = await Promise.all([
        fetch('http://localhost:5000/api/medical/records'),
        fetch('http://localhost:5000/api/medical/labs')
      ]);

      if (recordsRes.ok && labsRes.ok) {
        const recordsData = await recordsRes.json();
        const labsData = await labsRes.json();
        setRecords(recordsData);
        setLabs(labsData);
      }
    } catch (error) {
      console.error("Error fetching medical data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. ADD RECORD OR LAB TEST ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = activeTab === 'records' ? '/records' : '/labs';
    
    try {
      const response = await fetch(`http://localhost:5000/api/medical${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchAllData(); // Refresh the lists
        setIsModalOpen(false);
        setFormData({ patient: '', doctor: '', diagnosis: '', prescription: '', test: 'Complete Blood Count (CBC)' });
      }
    } catch (error) {
      console.error(`Error adding ${activeTab}:`, error);
    }
  };

  // --- 3. MARK LAB AS COMPLETED ---
  const markLabCompleted = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medical/labs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed', result: 'Pending Doctor Review' })
      });
      
      if (response.ok) {
        fetchAllData(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating lab status:", error);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Filter logic 
  const filteredRecords = records.filter(rec => 
    rec.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rec.recordId && rec.recordId.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredLabs = labs.filter(lab => 
    lab.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lab.labId && lab.labId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  }

  return (
    <div className="h-full flex flex-col relative space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Records & Laboratory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage clinical histories and track laboratory results.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>{activeTab === 'records' ? 'Add Clinical Record' : 'Order Lab Test'}</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        
        {/* Top Controls & Tabs */}
        <div className="border-b border-gray-100">
          
          {/* Tabs */}
          <div className="flex px-6 pt-4 space-x-8">
            <button 
              onClick={() => setActiveTab('records')}
              className={`pb-4 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'records' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={18} /> Clinical Records
            </button>
            <button 
              onClick={() => setActiveTab('labs')}
              className={`pb-4 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'labs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FlaskConical size={18} /> Laboratory Tests
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by patient or ID..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Date & ID</th>
                <th className="p-4 font-medium">Patient</th>
                {activeTab === 'records' ? (
                  <>
                    <th className="p-4 font-medium">Doctor</th>
                    <th className="p-4 font-medium">Diagnosis</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 font-medium">Test Ordered</th>
                    <th className="p-4 font-medium">Result / Status</th>
                  </>
                )}
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* RENDER CLINICAL RECORDS */}
              {activeTab === 'records' && filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-semibold text-gray-800">{new Date(rec.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{rec.recordId}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{rec.patient}</td>
                  <td className="p-4 text-sm text-gray-600">{rec.doctor}</td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-800">{rec.diagnosis}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Activity size={12}/> Rx: {rec.prescription}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><Download size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* RENDER LABORATORY TESTS */}
              {activeTab === 'labs' && filteredLabs.map((lab) => (
                <tr key={lab.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-semibold text-gray-800">{new Date(lab.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{lab.labId}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{lab.patient}</td>
                  <td className="p-4 text-sm font-medium text-gray-800">{lab.test}</td>
                  <td className="p-4">
                    {lab.status === 'Completed' ? (
                      <div>
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium inline-block mb-1">Completed</span>
                        <p className="text-sm text-gray-600">{lab.result}</p>
                      </div>
                    ) : (
                      <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium flex items-center gap-1.5 w-max">
                        <Clock size={14}/> Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {lab.status === 'Pending' && (
                        <button onClick={() => markLabCompleted(lab.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Mark Completed">
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FileText size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          
          {(activeTab === 'records' && filteredRecords.length === 0) || (activeTab === 'labs' && filteredLabs.length === 0) ? (
            <div className="p-10 text-center text-gray-500">
              No data found.
            </div>
          ) : null}
        </div>
      </div>

      {/* --- ADD RECORD / ORDER TEST MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'records' ? 'Add Clinical Record' : 'Order Lab Test'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-sm"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
                <input required type="text" name="patient" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors" value={formData.patient} onChange={handleInputChange} placeholder="E.g. Sarah Jenkins" />
              </div>

              {activeTab === 'records' ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Attending Doctor</label>
                    <input required type="text" name="doctor" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors" value={formData.doctor} onChange={handleInputChange} placeholder="E.g. Dr. Emily Chen" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
                    <input required type="text" name="diagnosis" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors" value={formData.diagnosis} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Prescription Details</label>
                    <input required type="text" name="prescription" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors" value={formData.prescription} onChange={handleInputChange} />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Lab Test</label>
                  <select name="test" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors" value={formData.test} onChange={handleInputChange}>
                    <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                    <option value="Lipid Panel">Lipid Panel</option>
                    <option value="Comprehensive Metabolic Panel">Comprehensive Metabolic Panel</option>
                    <option value="Urinalysis">Urinalysis</option>
                    <option value="Chest X-Ray">Chest X-Ray</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-sm">Save & Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}