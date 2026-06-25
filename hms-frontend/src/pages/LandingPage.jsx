import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Clock, Users, ArrowRight, Stethoscope, ChevronRight, LayoutGrid } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">H</div>
            <span className="font-bold text-xl tracking-tight">MedConnect</span>
          </div>
          <div className="space-x-2">
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-blue-600">Log in</Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-blue-600">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
              <Stethoscope size={16} /> <span>Trusted by 500+ Healthcare Providers</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Manage Care, <span className="text-blue-600">Simplified.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              The all-in-one platform for modern hospitals. Manage appointments, billing, and patient records with surgical precision.
            </p>
            <div className="flex space-x-4">
              <Link to="/dashboard" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 flex items-center shadow-lg">
                Enter Dashboard <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          
          {/* Hero Image - Simplified and Direct */}
          <div className="w-full">
            <img 
              src="https://www.royalcarehospital.in/wp-content/uploads/2025/04/Buildingrc-history.jpg" 
              alt="Hospital Tech" 
              className="rounded-4xl shadow-2xl w-full h-[550px] object-cover"
            />
          </div>
        </div>
      </main>

      {/* Image Gallery */}
      <section className="py-16 max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold">
          <LayoutGrid size={20} /> <span>Facility Highlights</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=600&q=80"
          ].map((img, i) => (
            <div key={i} className="rounded-2xl shadow-lg overflow-hidden h-48">
              <img 
                src={img} 
                alt="Hospital Facility" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-center mb-16">Intelligence in Every Detail</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Patient Flow", desc: "Intelligent triage and scheduling engine.", color: "bg-blue-500" },
            { icon: Activity, title: "Clinical Data", desc: "Real-time records and lab visualization.", color: "bg-purple-500" },
            { icon: Shield, title: "HIPAA Compliant", desc: "Bank-grade encryption for all patient data.", color: "bg-green-500" }
          ].map((feat, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 hover:border-blue-100 transition-all shadow-sm">
              <div className={`${feat.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8`}>
                <feat.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-gray-500 mb-6">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}