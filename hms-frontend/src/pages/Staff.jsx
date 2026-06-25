import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, UserPlus, Loader2 } from 'lucide-react';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/staff')
      .then(res => res.json())
      .then(data => { setStaff(data); setIsLoading(false); });
  }, []);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <UserPlus size={18} /> Add New Staff
        </button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Department</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">{s.role}</td>
                <td className="p-4">{s.department}</td>
                <td className="p-4 text-gray-600">{s.email}</td>
                <td className="p-4"><Trash2 size={16} className="text-red-400 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}