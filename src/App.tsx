import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AdminPanel from './components/AdminPanel';
import ConsultantPanel from './components/ConsultantPanel';
import ReportDashboard from './components/ReportDashboard';
import SimulationPage from './components/SimulationPage';
import AnalyticsPage from './components/AnalyticsPage';
import LawBridgePage from './components/LawBridgePage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import InteractiveTraining from './components/InteractiveTraining';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import authService from './services/authService';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentPage('app');
    setActiveTab('dashboard');
  };

  const handleSignup = (userData: any) => {
    // After successful signup, auto-login the user
    setIsAuthenticated(true);
    setCurrentPage('app');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setActiveTab('training');
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setCurrentPage('landing')}
          onForgotPassword={() => console.log('Forgot password clicked')}
          onSignUp={() => setCurrentPage('signup')}
        />
      );
    }
    
    if (currentPage === 'signup') {
      return (
        <SignupPage
          onSignup={handleSignup}
          onBack={() => setCurrentPage('landing')}
          onLogin={() => setCurrentPage('login')}
        />
      );
    }
    
    return (
      <LandingPage
        onGetStarted={() => setCurrentPage('login')}
        onLogin={() => setCurrentPage('login')}
      />
    );
  }

  // Show app content if authenticated
  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-grow overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'simulations' && <SimulationPage />}
        {activeTab === 'consultant' && <ConsultantPanel />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'reports' && <ReportDashboard />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'law-bridge' && <LawBridgePage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'training' && <InteractiveTraining />}
      </div>
    </div>
  );
}

export default App;
