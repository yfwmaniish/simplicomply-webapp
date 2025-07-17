import React, { useState } from 'react';
import { Play, Users, AlertTriangle, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const ConsultantPanel: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState('Acme Inc');
  
  const scenarios = [
    { 
      id: 'gdpr', 
      name: 'GDPR Data Breach Response', 
      category: 'GDPR',
      level: 'High',
      color: 'bg-red-100 text-red-800',
      dot: 'bg-red-500'
    },
    { 
      id: 'pci', 
      name: 'PCI DSS Incident Handling', 
      category: 'PCI DSS',
      level: 'Medium',
      color: 'bg-yellow-100 text-yellow-800',
      dot: 'bg-yellow-500'
    },
    { 
      id: 'hipaa', 
      name: 'HIPAA Privacy Assessment', 
      category: 'HIPAA',
      level: 'High',
      color: 'bg-red-100 text-red-800',
      dot: 'bg-red-500'
    },
  ];

  const teams = [
    { 
      id: 'it', 
      name: 'IT Department', 
      members: 12, 
      status: 'ready',
      color: 'bg-green-500'
    },
    { 
      id: 'hr', 
      name: 'HR Team', 
      members: 8, 
      status: 'ready',
      color: 'bg-green-500'
    },
    { 
      id: 'legal', 
      name: 'Legal Team', 
      members: 5, 
      status: 'warning',
      color: 'bg-yellow-500'
    },
    { 
      id: 'support', 
      name: 'Customer Support', 
      members: 15, 
      status: 'ready',
      color: 'bg-green-500'
    },
    { 
      id: 'finance', 
      name: 'Finance Team', 
      members: 10, 
      status: 'ready',
      color: 'bg-green-500'
    },
  ];

  const findings = [
    { team: 'IT Department', status: 'Failed', issues: ['Delayed incident response', 'Incomplete data mapping'] },
    { team: 'HR Team', status: 'Failed', issues: ['Missing privacy notices', 'Inadequate consent records'] },
    { team: 'Legal Team', status: 'Passed', issues: [] },
  ];

  const comments = [
    {
      author: 'Sarah Johnson',
      time: '2 hours ago',
      urgency: 'Urgent',
      message: 'IT team struggled with data classification requirements. Recommend additional training on GDPR Article 30.'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        {/* Client Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Client</h3>
          <div className="relative">
            <select 
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Acme Inc</option>
              <option>TechCorp</option>
              <option>DataSys</option>
            </select>
          </div>
        </div>

        {/* Scenario Library */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Library</h3>
          <div className="space-y-3">
            {scenarios.map(scenario => (
              <div key={scenario.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{scenario.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${scenario.color}`}>
                    {scenario.level}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className={`w-2 h-2 rounded-full ${scenario.dot} mr-2`}></div>
                  <span>{scenario.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Consultant Mode</h1>
          <p className="text-gray-600">Run simulations and assess team performance</p>
        </div>

        {/* Run Simulation Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Run Simulation</h2>
          <p className="text-gray-600 mb-4">Select Teams</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {teams.map(team => (
              <div key={team.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Users className="text-gray-400 mr-3" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">{team.name}</div>
                    <div className="text-sm text-gray-500">{team.members} members</div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
              </div>
            ))}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <Play className="mr-2" size={20} />
            Start Simulation
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        {/* Findings */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-yellow-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Findings</h3>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-red-600">3/5</div>
            <div className="text-sm text-gray-600">teams failed</div>
          </div>

          <div className="space-y-3">
            {findings.map((finding, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{finding.team}</div>
                  <div className={`text-sm ${
                    finding.status === 'Failed' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {finding.status}
                  </div>
                </div>
                {finding.status === 'Failed' ? (
                  <AlertTriangle className="text-red-500" size={20} />
                ) : (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <div className="flex items-center mb-4">
            <MessageCircle className="text-blue-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
          </div>
          
          {comments.map((comment, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{comment.author}</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {comment.urgency}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <Clock className="inline mr-1" size={12} />
                {comment.time}
              </div>
              <p className="text-sm text-gray-800">{comment.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantPanel;

