import React, { useState } from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'admin@medconnect.com', role: 'Administrator' });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">JD</div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-500">{profile.role}</p>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input className="w-full p-2 border rounded-lg" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input className="w-full p-2 border rounded-lg" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}