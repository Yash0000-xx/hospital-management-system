import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Internal Dashboard Pages
import DashboardOverview from "./pages/DashboardOverview";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Pharmacy from "./pages/Pharmacy";
import Billing from "./pages/Billing";
import MedicalRecords from "./pages/MedicalRecords";

// --- THE UPGRADED SECURITY WRAPPER ---
const ProtectedLayout = () => {
  // 1. Check if the user has the VIP wristband saved in their browser
  const token = localStorage.getItem('hms_token');

  // 2. If they don't have a token, kick them back to the login page instantly!
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If they DO have the token, let them see the dashboard
  return (
    <DashboardLayout>
      <Outlet /> 
    </DashboardLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (No Sidebar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES (With Sidebar & Security Check) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/lab" element={<MedicalRecords />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-400">404 - Page Not Found</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;