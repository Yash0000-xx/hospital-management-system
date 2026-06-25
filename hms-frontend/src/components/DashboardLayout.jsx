import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { 
  LayoutDashboard, Users, UserRoundCog, Building2, CalendarCheck, 
  Pill, FileText, FlaskConical, Receipt, ShieldCheck, 
  Search, Bell, FileBarChart, Menu, X, LogOut, Activity, ArrowLeft
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path }) => (
  <NavLink 
    to={path}
    className={({ isActive }) => `
      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
      ${isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }
    `}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </NavLink>
);

export default function DashboardLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to securely log out?")) {
      localStorage.removeItem('hms_token');
      navigate('/login');
    }
  };

  const navGroups = [
    {
      title: "Overview",
      items: [{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" }]
    },
    {
      title: "Directory",
      items: [
        { icon: Users, label: "Patient Management", path: "/patients" },
        { icon: UserRoundCog, label: "Doctor Management", path: "/doctors" },
        { icon: ShieldCheck, label: "Staff Management", path: "/staff" },
        { icon: Building2, label: "Departments", path: "/departments" }
      ]
    },
    {
      title: "Clinical",
      items: [
        { icon: CalendarCheck, label: "Appointments", path: "/appointments" },
        { icon: FileText, label: "Medical Records", path: "/records" },
        { icon: Pill, label: "Prescriptions", path: "/prescriptions" },
        { icon: FlaskConical, label: "Laboratory", path: "/lab" }
      ]
    },
    {
      title: "Operations",
      items: [
        { icon: Pill, label: "Pharmacy & Medicine", path: "/pharmacy" },
        { icon: Receipt, label: "Billing & Payments", path: "/billing" },
        { icon: FileBarChart, label: "Reports", path: "/reports" }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-md shadow-md text-gray-700"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">H</div>
          <span className="font-bold text-lg tracking-wide">MedConnect</span>
        </div>

        <div className="p-4 border-b border-gray-800">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm transition-all border border-gray-700"
          >
            <ArrowLeft size={16} />
            <span>Back to Landing</span>
          </button>
        </div>

        <div className="p-4 space-y-6 flex-1 overflow-y-auto">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, i) => (
                  <SidebarItem key={i} icon={item.icon} label={item.label} path={item.path} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 relative">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64 lg:w-96">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700" />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm">Notifications</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 border-b pb-2">⚠️ Low stock: Amoxicillin 500mg</p>
                    <p className="text-sm text-gray-600 border-b pb-2">📅 New appointment at 4:00 PM</p>
                    <p className="text-sm text-gray-600">✅ Lab test for Sarah Jenkins ready</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Link */}
            <NavLink to="/profile" className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs hover:ring-2 ring-blue-500 transition-all">
              JD
            </NavLink>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}