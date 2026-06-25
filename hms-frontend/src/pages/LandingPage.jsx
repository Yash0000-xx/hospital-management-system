import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Clock, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl">H</div>
          <span className="font-bold text-xl tracking-wide text-gray-900">MedConnect</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="px-5 py-2.5 text-gray-600 font-medium hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <Link to="/register" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Next-Generation <span className="text-blue-600">Hospital Management</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Streamline your clinical operations, manage patient records, and optimize billing with our comprehensive, secure, and intuitive platform.
          </p>
          <div className="flex space-x-4">
            <Link to="/dashboard" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center">
              Go to Dashboard <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/login" className="px-6 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Modern Hospital" 
            className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
          />
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-4 border border-gray-100">
            <div className="bg-green-100 p-3 rounded-full text-green-600"><Activity size={24} /></div>
            <div>
              <p className="text-sm font-bold text-gray-800">System Status</p>
              <p className="text-xs text-gray-500">All systems operational</p>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to run your facility</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Built for modern healthcare teams to focus on what matters most: patient care.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Users size={24} /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Patient Directory</h3>
              <p className="text-gray-600">Centralized records, medical histories, and laboratory results accessible instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6"><Clock size={24} /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">Eliminate double-booking with real-time doctor availability and automated status tracking.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6"><Shield size={24} /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Operations</h3>
              <p className="text-gray-600">Bank-level security for billing, payments, and pharmacy inventory management.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}