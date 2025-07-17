import React from 'react';
import { Download, UserPlus } from 'lucide-react';

const ReportDashboard: React.FC = () => {
  const complianceData = [
    { department: 'IT', gdpr: 95, pci: 88, hipaa: 92 },
    { department: 'HR', gdpr: 87, pci: 75, hipaa: 89 },
    { department: 'Legal', gdpr: 98, pci: 85, hipaa: 94 },
    { department: 'Support', gdpr: 76, pci: 82, hipaa: 78 },
  ];

  const getStatusBadge = (value: number) => {
    if (value >= 90) return 'bg-green-500 text-white';
    if (value >= 70) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Dashboard</h1>
            <p className="text-gray-600">Monitor compliance across all departments</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white px-4 py-2 rounded-md flex items-center gap-2 border border-gray-200">
              <Download size={20} />
              Export PDF
            </button>
            <button className="bg-white px-4 py-2 rounded-md flex items-center gap-2 border border-gray-200">
              <Download size={20} />
              Export CSV
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <UserPlus size={20} />
              Assign Remediation
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-6 mb-6">
          <select className="w-1/2 p-2 border border-gray-300 rounded-md">
            <option>Date Range</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
          <select className="w-1/2 p-2 border border-gray-300 rounded-md">
            <option>Department</option>
            <option>All Departments</option>
          </select>
        </div>

        {/* Compliance Heatmap */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Heatmap</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GDPR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PCI DSS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HIPAA</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(data.gdpr)}`}>
                      {data.gdpr}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(data.pci)}`}>
                      {data.pci}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(data.hipaa)}`}>
                      {data.hipaa}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance Trend</h3>
            {/* Trend Graph Placeholder */}
            <div className="h-32 bg-gray-100 rounded"></div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Top Risk Areas</h3>
            {/* Top Risks Placeholder */}
            <div className="h-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;

