import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // <-- Added useNavigate
import { 
  LayoutDashboard, Users, UserRoundCog, Building2, CalendarCheck, 
  Pill, FileText, FlaskConical, Receipt, ShieldCheck, 
  Search, Bell, FileBarChart, Menu, X, LogOut // <-- Added LogOut icon
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
  const navigate = useNavigate(); // <-- Initialize the navigation hook

  // --- THE LOGOUT LOGIC ---
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to securely log out?")) {
      localStorage.removeItem('hms_token'); // Rip off the VIP wristband
      navigate('/login'); // Kick them back to the login screen
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

        {/* Added flex-1 and overflow-y-auto here so the nav scrolls but the logout stays at the bottom */}
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

        {/* --- THE NEW SECURE LOGOUT BUTTON --- */}
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
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64 lg:w-96">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients, doctors..." 
              className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}