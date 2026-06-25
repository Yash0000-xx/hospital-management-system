import React, { useState, useEffect } from 'react';
import { FileBarChart, Download, Users, DollarSign, CalendarCheck, Loader2 } from 'lucide-react';

export default function Reports() {
  const [stats, setStats] = useState({ totalPatients: 0, totalRevenue: 0, totalAppointments: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reports/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reports:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hospital Reports</h1>
          <p className="text-gray-500">Real-time summary analytics.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors">
          <Download size={18} /> Export All Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard title="Total Patients" value={stats.totalPatients} icon={Users} color="text-blue-600" />
        <ReportCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="text-green-600" />
        <ReportCard title="Total Appointments" value={stats.totalAppointments} icon={CalendarCheck} color="text-purple-600" />
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center shadow-sm">
        <FileBarChart size={48} className="mx-auto text-blue-200 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Analytics Dashboard</h3>
        <p className="text-gray-400 mt-2">All data is synced live with your MongoDB database.</p>
      </div>
    </div>
  );
}

function ReportCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div className={`p-3 rounded-lg bg-gray-50 ${color}`}><Icon size={24} /></div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
      </div>
    </div>
  );
}