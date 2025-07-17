import React from 'react';
import {
  BarChart3,
  FileText,
  Settings,
  User,
  Brain,
  Home,
  Shield,
  LogOut
} from 'lucide-react';
import authService from '../services/authService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const userRole = authService.getUserRole();
  const user = authService.getUser();
  
  // Base menu items available to all users
  const baseMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['user', 'consultant', 'manager', 'admin'] },
    { id: 'training', label: 'Training', icon: Brain, roles: ['user', 'consultant', 'manager', 'admin'] },
    { id: 'simulations', label: 'Simulations', icon: Brain, roles: ['user', 'consultant', 'manager', 'admin'] },
    { id: 'law-bridge', label: 'Law Bridge', icon: Shield, roles: ['user', 'consultant', 'manager', 'admin'] },
    { id: 'profile', label: 'Profile', icon: User, roles: ['user', 'consultant', 'manager', 'admin'] },
  ];
  
  // Role-specific menu items
  const roleSpecificItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['consultant', 'manager', 'admin'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['consultant', 'manager', 'admin'] },
    { id: 'consultant', label: 'Consultant', icon: User, roles: ['consultant', 'manager', 'admin'] },
    { id: 'admin', label: 'Admin', icon: Settings, roles: ['admin'] },
  ];
  
  // Filter menu items based on user role
  const menuItems = [...baseMenuItems, ...roleSpecificItems].filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">SC</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">SimpliComply</span>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        {/* User Info */}
        {user && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <div className="font-medium text-gray-900">{user.fullName}</div>
                <div className="text-xs text-gray-500 capitalize">{userRole}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Logout Button */}
        {onLogout && (
          <div className="mt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
