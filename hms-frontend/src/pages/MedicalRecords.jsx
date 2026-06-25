import React, { useState } from 'react';
import { 
  Search, Plus, Filter, FileText, FlaskConical, 
  Download, Eye, Activity, CheckCircle2, Clock, X 
} from 'lucide-react';

// Fake database for Clinical Records
const initialRecords = [
  { id: 'REC-101', patient: 'Sarah Jenkins', date: '2026-06-20', doctor: 'Dr. Emily Chen', diagnosis: 'Hypertension', prescription: 'Lisinopril 10mg' },
  { id: 'REC-102', patient: 'Michael Chen', date: '2026-06-15', doctor: 'Dr. James Wilson', diagnosis: 'Acute Bronchitis', prescription: 'Amoxicillin 500mg' },
  { id: 'REC-103', patient: 'Emily Rodriguez', date: '2026-05-10', doctor: 'Dr. Sarah Smith', diagnosis: 'Type 2 Diabetes', prescription: 'Metformin 850mg' },
];

// Fake database for Lab Tests
const initialLabs = [
  { id: 'LAB-201', patient: 'Sarah Jenkins', date: '2026-06-20', test: 'Complete Blood Count (CBC)', status: 'Completed', result: 'Normal' },
  { id: 'LAB-202', patient: 'James Wilson', date: '2026-06-25', test: 'Lipid Panel', status: 'Pending', result: '-' },
  { id: 'LAB-203', patient: 'Michael Chen', date: '2026-06-26', test: 'Chest X-Ray', status: 'Pending', result: '-' },
  { id: 'LAB-204', patient: 'Maria Garcia', date: '2026-06-22', test: 'Thyroid Panel (TSH)', status: 'Completed', result: 'Slightly Elevated' },
];

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState('records'); // 'records' or 'labs'
  const [searchTerm, setSearchTerm] = useState('');
  
  const [records, setRecords] = useState(initialRecords);
  const [labs, setLabs] = useState(initialLabs);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', diagnosis: '', prescription: '', test: ''
  });

  // Filter logic based on the active tab
  const filteredRecords = records.filter(rec => rec.patient.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLabs = labs.filter(lab => lab.patient.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'records') {
      const newRecord = {
        ...formData,
        id: `REC-${Math.floor(Math.random() * 900) + 100}`,
        date: new Date().toISOString().split('T')[0]
      };
      setRecords([newRecord, ...records]);
    } else {
      const newLab = {
        patient: formData.patient,
        test: formData.test,
        id: `LAB-${Math.floor(Math.random() * 900) + 100}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        result: '-'
      };
      setLabs([newLab, ...labs]);
    }
    setIsModalOpen(false);
    setFormData({ patient: '', doctor: '', diagnosis: '', prescription: '', test: '' });
  };

  const markLabCompleted = (id) => {
    setLabs(labs.map(lab => lab.id === id ? { ...lab, status: 'Completed', result: 'Pending Doctor Review' } : lab));
  };

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
                placeholder="Search patient records..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
              <Filter size={18} />
            </button>
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
                    <p className="text-sm font-semibold text-gray-800">{rec.date}</p>
                    <p className="text-xs text-gray-500">{rec.id}</p>
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
                    <p className="text-sm font-semibold text-gray-800">{lab.date}</p>
                    <p className="text-xs text-gray-500">{lab.id}</p>
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
                <input required type="text" name="patient" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.patient} onChange={handleInputChange} placeholder="Search patient..." />
              </div>

              {activeTab === 'records' ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Attending Doctor</label>
                    <input required type="text" name="doctor" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.doctor} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
                    <input required type="text" name="diagnosis" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.diagnosis} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Prescription Details</label>
                    <input required type="text" name="prescription" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.prescription} onChange={handleInputChange} />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Lab Test</label>
                  <select name="test" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.test} onChange={handleInputChange}>
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