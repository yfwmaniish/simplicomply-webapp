import React from 'react';
import { 
  Users, 
  Brain, 
  BarChart3, 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Award,
  Calendar,
  Activity,
  Target,
  BookOpen
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Users',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Compliance Score',
      value: '92%',
      change: '+5%',
      changeType: 'increase',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      title: 'Active Simulations',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Reviews',
      value: '15',
      change: '-2',
      changeType: 'decrease',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'simulation',
      title: 'GDPR Data Breach Simulation completed',
      user: 'IT Department',
      time: '2 hours ago',
      status: 'completed',
      icon: Brain
    },
    {
      id: 2,
      type: 'training',
      title: 'HIPAA Privacy Training assigned',
      user: 'HR Team',
      time: '4 hours ago',
      status: 'pending',
      icon: BookOpen
    },
    {
      id: 3,
      type: 'report',
      title: 'Quarterly Compliance Report generated',
      user: 'Legal Team',
      time: '1 day ago',
      status: 'completed',
      icon: FileText
    },
    {
      id: 4,
      type: 'alert',
      title: 'PCI DSS compliance check failed',
      user: 'Finance Team',
      time: '2 days ago',
      status: 'critical',
      icon: AlertTriangle
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'SOX Financial Controls Assessment',
      dueDate: '2024-01-25',
      priority: 'High',
      department: 'Finance',
      progress: 75
    },
    {
      id: 2,
      title: 'GDPR Data Processing Training',
      dueDate: '2024-01-28',
      priority: 'Medium',
      department: 'IT',
      progress: 45
    },
    {
      id: 3,
      title: 'ISO 27001 Security Review',
      dueDate: '2024-02-02',
      priority: 'High',
      department: 'Security',
      progress: 30
    }
  ];

  const complianceMetrics = [
    { name: 'GDPR', score: 95, trend: 'up' },
    { name: 'PCI DSS', score: 88, trend: 'up' },
    { name: 'HIPAA', score: 92, trend: 'stable' },
    { name: 'SOX', score: 78, trend: 'down' },
    { name: 'ISO 27001', score: 85, trend: 'up' },
    { name: 'CCPA', score: 82, trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your compliance overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{deadline.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{deadline.department}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Due: {deadline.dueDate}</span>
                    <span className="text-xs text-gray-500">{deadline.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${deadline.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Compliance Metrics</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {complianceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                    <div className="flex items-center">
                      {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {metric.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                      {metric.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full"></div>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${getScoreColor(metric.score)}`}>
                      {metric.score}%
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.score >= 90 ? 'bg-green-500' : 
                          metric.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Brain className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Start Simulation</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-6 w-6 text-green-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Generate Report</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-6 w-6 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Users</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BookOpen className="h-6 w-6 text-orange-500 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
