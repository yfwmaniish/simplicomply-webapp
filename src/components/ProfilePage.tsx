import React from 'react';
import { Pencil, LogOut, ShieldCheck, Mail, User, Lock, Activity } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Compliance Manager',
    department: 'Legal',
    avatarUrl: '', // Example URL can be added
  };

  const activityLog = [
    {
      id: 1,
      description: 'Completed GDPR Training',
      date: '2024-01-12',
    },
    {
      id: 2,
      description: 'Reviewed PCI DSS Report',
      date: '2024-01-10',
    },
    {
      id: 3,
      description: 'Updated Company Security Policy',
      date: '2024-01-08',
    },
    {
      id: 4,
      description: 'Participated in HIPAA Simulation',
      date: '2024-01-05',
    },
  ];

  const handleEdit = () => {
    console.log('Edit Profile Clicked');
  };

  const handleLogout = () => {
    console.log('Logout Clicked');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 h-20 w-20 rounded-full bg-blue-200 flex items-center justify-center">
            <User className="h-10 w-10 text-blue-500" />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.role} • {user.department}</p>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="ml-auto">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              onClick={handleEdit}
            >
              <Pencil className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Security & Preferences</h2>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Email Preferences</h3>
              <div className="flex items-center">
                <Mail className="mr-2" />
                <span className="text-sm text-gray-600">Receive email notifications</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Security</h3>
              <div className="flex items-center">
                <ShieldCheck className="mr-2" />
                <span className="text-sm text-gray-600">Two-factor authentication enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="divide-y divide-gray-200">
            {activityLog.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-900">{activity.description}</span>
                  <span className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

