import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Shield, Clock, Users, ArrowRight, Stethoscope, 
  LayoutGrid, CheckCircle, HeartPulse, Star, Globe, Mail, Phone 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-sm">H</div>
            <span className="font-bold text-xl tracking-tight">MedConnect</span>
          </div>
          <div className="space-x-4 flex items-center">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Log in</Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-20 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 shadow-sm">
              <Stethoscope size={16} /> <span>Trusted by 500+ Healthcare Providers</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Manage Care, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simplified.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              The all-in-one platform for modern hospitals. Manage appointments, billing, and patient records with surgical precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/dashboard" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 flex items-center justify-center shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                Enter Dashboard <ArrowRight size={18} className="ml-2" />
              </Link>
              <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center shadow-sm transition-all">
                Book a Demo
              </button>
            </div>
          </div>
          
          {/* Hero Image with Floating UI Elements */}
          <div className="relative w-full h-[550px]">
            {/* Background Blob for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            
            <img 
              src="https://www.royalcarehospital.in/wp-content/uploads/2025/04/Buildingrc-history.jpg" 
              alt="Hospital Tech" 
              className="rounded-[2rem] shadow-2xl w-full h-full object-cover relative z-0 border border-gray-100"
            />

            {/* Floating UI Card 1 - Top Left */}
            <div className="absolute top-8 -left-8 md:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-300 z-20" style={{ animationDuration: '3s' }}>
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Appointment Confirmed</p>
                <p className="text-xs text-gray-500">Dr. Virat Kohli  • Today, 2:00 PM</p>
              </div>
            </div>

            {/* Floating UI Card 2 - Bottom Right */}
            <div className="absolute bottom-12 -right-6 md:-right-10 bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-4 z-20 transform hover:scale-105 transition-transform">
              <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                <HeartPulse size={24} className="animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Vitals Stabilized</p>
                <p className="text-xs text-gray-400">Patient ID: #8492</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Marquee Section */}
      <div className="w-full overflow-hidden bg-gray-50 border-y border-gray-200 py-8 flex relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-16 px-8 items-center text-gray-400 font-bold text-xl uppercase tracking-widest min-w-max">
              <span>Mayo Clinic</span>
              <span className="text-blue-300">•</span>
              <span>Cleveland Clinic</span>
              <span className="text-blue-300">•</span>
              <span>Johns Hopkins</span>
              <span className="text-blue-300">•</span>
              <span>Mount Sinai</span>
              <span className="text-blue-300">•</span>
              <span>Mass General</span>
              <span className="text-blue-300">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Bento Grid Features */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Intelligence in Every Detail.
          </h2>
          <p className="text-xl text-gray-500">
            Everything you need to manage a modern hospital, packed into a single, beautifully designed platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Large Card 1 */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between overflow-hidden relative group hover:shadow-xl transition-all duration-300">
            <div className="relative z-10">
              <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-md">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Patient Flow Optimization</h3>
              <p className="text-gray-600 max-w-sm text-lg">Intelligent triage, zero-wait scheduling, and seamless department transfers.</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
              <Activity size={250} />
            </div>
          </div>

          {/* Dark Mode Card */}
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col justify-between text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <div className="bg-gray-800 w-12 h-12 rounded-xl flex items-center justify-center text-green-400 mb-6 border border-gray-700">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">HIPAA Compliant</h3>
              <p className="text-gray-400 text-sm">Bank-grade, end-to-end encryption for all sensitive medical records.</p>
            </div>
          </div>

          {/* Tinted Accent Card */}
          <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-md">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clinical Data</h3>
              <p className="text-purple-700 text-sm">Real-time vitals tracking and automated laboratory result visualization.</p>
            </div>
          </div>

          {/* Large Bottom Card */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center text-orange-500 mb-6 border border-orange-100">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Scheduling</h3>
                <p className="text-gray-500 max-w-sm">Eliminate double-booking and optimize doctor availability instantly across all departments.</p>
              </div>
              <div className="hidden sm:flex">
                <div className="h-12 w-12 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold text-xs z-30">Dr. S</div>
                <div className="h-12 w-12 rounded-full bg-green-100 border-4 border-white shadow-sm flex items-center justify-center text-green-700 font-bold text-xs -ml-4 z-20">Dr. K</div>
                <div className="h-12 w-12 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center text-gray-600 font-bold text-xs -ml-4 z-10">+12</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-24 max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold justify-center md:justify-start">
          <LayoutGrid size={20} /> <span>Facility Highlights</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=600&q=80"
          ].map((img, i) => (
            <div key={i} className="rounded-2xl shadow-sm overflow-hidden h-48 hover:shadow-xl transition-shadow duration-300">
              <img src={img} alt="Hospital Facility" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">Loved by Medical Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr.Salman Khan", role: "Chief of Surgery", quote: "MedConnect cut our administrative workload by 40%. The surgical scheduling module alone is worth its weight in gold." },
              { name: "Shah Rukh Khan", role: "Hospital Administrator", quote: "Finally, a dashboard that doesn't require a Ph.D. to navigate. Onboarding our staff took days instead of weeks." },
              { name: "Tamannaah Bhatia", role: "Head Nurse", quote: "The real-time vitals tracking and instant HIPAA-compliant messaging has completely revolutionized our floor communication." }
            ].map((test, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-8 italic">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">{test.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-gray-900">{test.name}</p>
                    <p className="text-sm text-gray-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to transform your hospital?</h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Join 500+ healthcare facilities that have modernized their operations with MedConnect today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Start Free Trial
              </Link>
              <button className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl border border-indigo-500 hover:bg-indigo-600 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">H</div>
              <span className="font-bold text-xl tracking-tight">MedConnect</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">Building the future of healthcare management software, one hospital at a time.</p>
            <div className="flex space-x-4 text-gray-400">
              <Globe size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Mail size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Phone size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-gray-100">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Features</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Pricing</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Security</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Integration</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-100">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">About Us</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Careers</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Blog</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-100">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer transition-colors">HIPAA Compliance</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 MedConnect Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-gray-300 cursor-pointer">System Status: All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}