import React, { useState, useEffect } from 'react';
import { Building2, Plus, Trash2, Loader2 } from 'lucide-react';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/departments')
      .then(res => res.json())
      .then(data => { setDepartments(data); setIsLoading(false); });
  }, []);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Department
        </button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Department Name</th>
              <th className="p-4">Head of Dept</th>
              <th className="p-4">Staff Count</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{dept.name}</td>
                <td className="p-4">{dept.head}</td>
                <td className="p-4">{dept.staffCount}</td>
                <td className="p-4"><Trash2 size={16} className="text-red-400 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}