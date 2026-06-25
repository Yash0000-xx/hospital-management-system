import React, { useState, useEffect } from 'react';
import { Search, Plus, Pill, FileText, Trash2, Loader2, X } from 'lucide-react';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ patient: '', medicine: '', dosage: '', instructions: '' });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/prescriptions');
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/prescriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    fetchPrescriptions();
    setIsModalOpen(false);
    setFormData({ patient: '', medicine: '', dosage: '', instructions: '' });
  };

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Prescription
        </button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Patient</th>
              <th className="p-4">Medicine</th>
              <th className="p-4">Dosage</th>
              <th className="p-4">Instructions</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {prescriptions.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium">{p.patient}</td>
                <td className="p-4 flex items-center gap-2"><Pill size={16} className="text-blue-500" /> {p.medicine}</td>
                <td className="p-4">{p.dosage}</td>
                <td className="p-4 text-sm text-gray-600">{p.instructions}</td>
                <td className="p-4"><Trash2 size={16} className="text-red-400 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold">New Prescription</h2>
            <input required placeholder="Patient Name" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, patient: e.target.value})} />
            <input required placeholder="Medicine Name" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, medicine: e.target.value})} />
            <input required placeholder="Dosage (e.g. 500mg)" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, dosage: e.target.value})} />
            <textarea required placeholder="Instructions" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, instructions: e.target.value})} />
            <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}