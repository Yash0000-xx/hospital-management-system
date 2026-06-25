import React, { useState } from 'react';
import { Search, Plus, Filter, AlertTriangle, Pill, Edit, Trash2, X } from 'lucide-react';

// Fake database for Medicines
const initialInventory = [
  { id: 'MED-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 850, price: 12.50, status: 'In Stock' },
  { id: 'MED-002', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 1200, price: 5.00, status: 'In Stock' },
  { id: 'MED-003', name: 'Lisinopril 10mg', category: 'Cardiovascular', stock: 15, price: 18.00, status: 'Low Stock' },
  { id: 'MED-004', name: 'Metformin 850mg', category: 'Diabetes', stock: 0, price: 9.50, status: 'Out of Stock' },
  { id: 'MED-005', name: 'Omeprazole 20mg', category: 'Gastrointestinal', stock: 430, price: 14.00, status: 'In Stock' },
  { id: 'MED-006', name: 'Azithromycin 250mg', category: 'Antibiotics', stock: 45, price: 22.00, status: 'Low Stock' },
];

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(initialInventory);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'Antibiotics', stock: '', price: ''
  });

  // Calculate quick stats
  const lowStockCount = inventory.filter(med => med.stock > 0 && med.stock < 50).length;
  const outOfStockCount = inventory.filter(med => med.stock === 0).length;

  const filteredInventory = inventory.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status Badge Logic
  const getStatusBadge = (stock) => {
    if (stock === 0) return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Out of Stock</span>;
    if (stock < 50) return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><AlertTriangle size={12}/> Low Stock</span>;
    return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">In Stock</span>;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stockNum = parseInt(formData.stock);
    const newMedicine = {
      ...formData,
      id: `MED-00${inventory.length + 1}`,
      stock: stockNum,
      price: parseFloat(formData.price),
      status: stockNum === 0 ? 'Out of Stock' : stockNum < 50 ? 'Low Stock' : 'In Stock'
    };
    setInventory([newMedicine, ...inventory]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Antibiotics', stock: '', price: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this medicine from inventory?")) {
      setInventory(inventory.filter(med => med.id !== id));
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Header & Alerts */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacy Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage medicines, track stock levels, and update pricing.</p>
        </div>
        <div className="flex items-center space-x-3">
          {(lowStockCount > 0 || outOfStockCount > 0) && (
            <div className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg border border-red-100 font-medium text-sm">
              <AlertTriangle size={18} />
              <span>{lowStockCount + outOfStockCount} items need restocking</span>
            </div>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus size={18} />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by medicine name or category..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Medicine Name</th>
                <th className="p-4 font-medium hidden sm:table-cell">Category</th>
                <th className="p-4 font-medium">Stock Level</th>
                <th className="p-4 font-medium hidden md:table-cell">Unit Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${med.stock === 0 ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        <Pill size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{med.name}</p>
                        <p className="text-xs text-gray-500">{med.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell text-sm text-gray-600">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md">{med.category}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${med.stock === 0 ? 'text-red-600' : med.stock < 50 ? 'text-yellow-600' : 'text-gray-800'}`}>
                      {med.stock} units
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-sm text-gray-600 font-medium">
                    ${med.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(med.stock)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(med.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInventory.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No inventory found.
            </div>
          )}
        </div>
      </div>

      {/* --- ADD MEDICINE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Add New Medicine</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                <input required type="text" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.name} onChange={handleInputChange} placeholder="e.g. Paracetamol 500mg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.category} onChange={handleInputChange}>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
                  <input required type="number" name="stock" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.stock} onChange={handleInputChange} min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
                  <input required type="number" step="0.01" name="price" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={formData.price} onChange={handleInputChange} min="0" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium">Save Medicine</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}