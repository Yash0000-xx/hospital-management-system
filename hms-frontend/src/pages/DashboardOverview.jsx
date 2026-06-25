import React, { useState, useEffect } from 'react';
import { Users, Activity, Calendar, Clock, UserCheck, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    recentAppointments: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b']; // Blue, Green, Red, Yellow
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
        <p>Loading live hospital statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-red-500">
        <Activity size={40} className="mb-4" />
        <p>{error}</p>
        <p className="text-sm text-gray-400 mt-2">Make sure your Express server is running!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here is what is happening today.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Patients Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Patients</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalPatients}</h3>
          </div>
        </div>

        {/* Doctors Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Doctors</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalDoctors}</h3>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Appointments</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalAppointments}</h3>
          </div>
        </div>

      </div>
{/* Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* The Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Appointments by Status</h2>
          <div className="h-64 w-full">
            {stats.chartData && stats.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No chart data available
              </div>
            )}
          </div>
        </div>

        {/* You can move your Recent Appointments table into the remaining 2 columns here if you want it side-by-side! */}
      </div>
      {/* Recent Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Recent Appointments</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {stats.recentAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No recent appointments found.
            </div>
          ) : (
            stats.recentAppointments.map((appt) => (
              <div key={appt.id} className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    {appt.patient?.name ? appt.patient.name.substring(0, 2).toUpperCase() : 'PT'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{appt.patient?.name || 'Unknown Patient'}</h3>
                    <p className="text-sm text-gray-500">Seeing: {appt.doctor?.name || 'Unknown Doctor'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-sm text-gray-600 flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {appt.time}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                    {appt.status}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}