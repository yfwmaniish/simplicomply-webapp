import React from 'react';
import { AlertTriangle, CheckCircle, Clock, PlayCircle } from 'lucide-react';

const AssignmentCard: React.FC<{
  title: string;
  category: string;
  progress: number;
  dueDate: string;
  estTime: string;
  iconColor: string;
  actionLabel: string;
}> = ({ title, category, progress, dueDate, estTime, iconColor, actionLabel }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xl font-semibold text-gray-900">{title}</span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
        {iconColor.includes('red') ? <AlertTriangle className="text-white" size={20} /> : <CheckCircle className="text-white" size={20} />}
      </div>
    </div>
    <div className="mb-2">
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{category}</span>
    </div>
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            {progress}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-gray-600">
            Progress
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
      </div>
    </div>
    <ul className="mb-4">
      <li className="flex items-center text-sm text-gray-600">
        <Clock size={16} className="mr-2 text-gray-400" />
        Due Date: {dueDate}
      </li>
      <li className="flex items-center text-sm text-gray-600">
        <Clock size={16} className="mr-2 text-gray-400" />
        Est. Time: {estTime}
      </li>
    </ul>
    <button className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-semibold tracking-wide transition-colors ${iconColor.includes('red') ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
      {iconColor.includes('red') ? <PlayCircle className="mr-2" size={20} /> : null}
      {actionLabel}
    </button>
  </div>
);

const CurrentAssignments: React.FC = () => {
  const assignments = [
    {
      title: 'GDPR Data Processing Training',
      category: 'GDPR',
      progress: 75,
      dueDate: 'Jan 20, 2024',
      estTime: '15 min',
      iconColor: 'bg-red-500',
      actionLabel: 'Continue'
    },
    {
      title: 'PCI Security Assessment',
      category: 'PCI',
      progress: 100,
      dueDate: 'Jan 15, 2024',
      estTime: '20 min',
      iconColor: 'bg-blue-500',
      actionLabel: 'Review'
    },
    {
      title: 'HIPAA Privacy Simulation',
      category: 'HIPAA',
      progress: 0,
      dueDate: 'Jan 25, 2024',
      estTime: '25 min',
      iconColor: 'bg-red-500',
      actionLabel: 'Start'
    },
    {
      title: 'SOX Financial Controls',
      category: 'SOX',
      progress: 45,
      dueDate: 'Jan 22, 2024',
      estTime: '30 min',
      iconColor: 'bg-red-500',
      actionLabel: 'Continue'
    },
    {
      title: 'ISO 27001 Security Training',
      category: 'ISO',
      progress: 100,
      dueDate: 'Jan 12, 2024',
      estTime: '18 min',
      iconColor: 'bg-blue-500',
      actionLabel: 'Review'
    },
    {
      title: 'CCPA Consumer Rights',
      category: 'CCPA',
      progress: 20,
      dueDate: 'Jan 28, 2024',
      estTime: '22 min',
      iconColor: 'bg-yellow-500',
      actionLabel: 'Continue'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Current Assignments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <AssignmentCard key={index} {...assignment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAssignments;

