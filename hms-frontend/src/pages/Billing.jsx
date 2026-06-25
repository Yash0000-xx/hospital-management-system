import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Download, Receipt, 
  CheckCircle, Clock, AlertCircle, X, DollarSign, FileText 
} from 'lucide-react';

// Fake database for Invoices
const initialInvoices = [
  { id: 'INV-2026-001', patient: 'Sarah Jenkins', date: '2026-06-20', type: 'Consultation & Pharmacy', amount: 145.50, status: 'Paid' },
  { id: 'INV-2026-002', patient: 'Michael Chen', date: '2026-06-22', type: 'Surgery (Appendectomy)', amount: 4500.00, status: 'Pending' },
  { id: 'INV-2026-003', patient: 'Emily Rodriguez', date: '2026-05-15', type: 'Lab Tests', amount: 320.00, status: 'Overdue' },
  { id: 'INV-2026-004', patient: 'James Wilson', date: '2026-06-23', type: 'Cardiology Checkup', amount: 250.00, status: 'Paid' },
  { id: 'INV-2026-005', patient: 'Maria Garcia', date: '2026-06-24', type: 'Pharmacy (Prescription)', amount: 45.00, status: 'Pending' },
];

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    patient: '', type: 'Consultation', amount: '', status: 'Pending'
  });

  // Calculate quick financial stats
  const totalRevenue = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const filteredInvoices = invoices.filter(inv => 
    inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1.5 w-max"><CheckCircle size={14}/> Paid</span>;
      case 'Pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1.5 w-max"><Clock size={14}/> Pending</span>;
      case 'Overdue': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1.5 w-max"><AlertCircle size={14}/> Overdue</span>;
      default: return null;
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      ...formData,
      id: `INV-2026-00${invoices.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(formData.amount)
    };
    setInvoices([newInvoice, ...invoices]);
    setIsModalOpen(false);
    setFormData({ patient: '', type: 'Consultation', amount: '', status: 'Pending' });
  };

  const handleMarkAsPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
  };

  return (
    <div className="h-full flex flex-col relative space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage invoices, track payments, and generate receipts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><DollarSign size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Collected Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><Clock size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Payments</p>
            <h3 className="text-2xl font-bold text-gray-800">${pendingAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertCircle size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Overdue Amount</p>
            <h3 className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        
        {/* Controls Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Patient or Invoice ID..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors bg-white">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Invoice Info</th>
                <th className="p-4 font-medium hidden sm:table-cell">Patient</th>
                <th className="p-4 font-medium hidden md:table-cell">Service Type</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Receipt size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{inv.id}</p>
                        <p className="text-xs text-gray-500">{inv.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell font-medium text-gray-700">{inv.patient}</td>
                  <td className="p-4 hidden md:table-cell text-sm text-gray-600">{inv.type}</td>
                  <td className="p-4 font-bold text-gray-800">${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  <td className="p-4">{getStatusBadge(inv.status)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {inv.status !== 'Paid' && (
                        <button onClick={() => handleMarkAsPaid(inv.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark as Paid">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Invoice">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Download PDF">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInvoices.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No invoices found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* --- CREATE INVOICE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Generate Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-sm">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
                <input required type="text" name="patient" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-gray-50 focus:bg-white" value={formData.patient} onChange={handleInputChange} placeholder="Search patient..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
                <select name="type" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-gray-50 focus:bg-white" value={formData.type} onChange={handleInputChange}>
                  <option value="Consultation">Consultation</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Lab Tests">Lab Tests</option>
                  <option value="Pharmacy (Prescription)">Pharmacy (Prescription)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Total Amount ($)</label>
                  <input required type="number" step="0.01" name="amount" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-gray-50 focus:bg-white" value={formData.amount} onChange={handleInputChange} min="0" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status</label>
                  <select name="status" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-gray-50 focus:bg-white" value={formData.status} onChange={handleInputChange}>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-sm">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}