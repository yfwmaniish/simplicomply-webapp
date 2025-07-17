import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Users, AlertTriangle, Trophy, Target } from 'lucide-react';

interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  participants: number;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
}

const SimulationPage: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const scenarios: SimulationScenario[] = [
    {
      id: 'gdpr-breach',
      title: 'GDPR Data Breach Response',
      description: 'Simulate a data breach incident and test your team\'s response according to GDPR requirements.',
      category: 'GDPR',
      difficulty: 'Hard',
      duration: '45 min',
      participants: 12,
      status: 'not_started'
    },
    {
      id: 'pci-audit',
      title: 'PCI DSS Compliance Audit',
      description: 'Navigate through a PCI DSS audit simulation with real-world scenarios.',
      category: 'PCI DSS',
      difficulty: 'Medium',
      duration: '30 min',
      participants: 8,
      status: 'completed',
      score: 85
    },
    {
      id: 'hipaa-privacy',
      title: 'HIPAA Privacy Incident',
      description: 'Handle a healthcare privacy incident following HIPAA guidelines.',
      category: 'HIPAA',
      difficulty: 'Medium',
      duration: '35 min',
      participants: 15,
      status: 'in_progress'
    },
    {
      id: 'sox-controls',
      title: 'SOX Financial Controls Test',
      description: 'Test internal controls and financial reporting procedures.',
      category: 'SOX',
      difficulty: 'Hard',
      duration: '50 min',
      participants: 6,
      status: 'not_started'
    },
    {
      id: 'iso-security',
      title: 'ISO 27001 Security Assessment',
      description: 'Evaluate information security management systems.',
      category: 'ISO 27001',
      difficulty: 'Easy',
      duration: '25 min',
      participants: 10,
      status: 'completed',
      score: 92
    },
    {
      id: 'ccpa-rights',
      title: 'CCPA Consumer Rights Response',
      description: 'Handle consumer data requests under CCPA regulations.',
      category: 'CCPA',
      difficulty: 'Medium',
      duration: '40 min',
      participants: 7,
      status: 'not_started'
    }
  ];

  const simulationSteps = [
    'Initialize Environment',
    'Deploy Scenario',
    'Monitor Participants',
    'Collect Responses',
    'Analyze Results',
    'Generate Report'
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />;
      case 'in_progress': return <Clock className="text-yellow-500" size={20} />;
      default: return <Target className="text-gray-400" size={20} />;
    }
  };

  const startSimulation = (scenarioId: string) => {
    setActiveSimulation(scenarioId);
    setSimulationRunning(true);
    setCurrentStep(0);
  };

  const pauseSimulation = () => {
    setSimulationRunning(false);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    setCurrentStep(0);
    setActiveSimulation(null);
  };

  React.useEffect(() => {
    if (simulationRunning && currentStep < simulationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep === simulationSteps.length - 1) {
      setSimulationRunning(false);
    }
  }, [simulationRunning, currentStep]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Simulations</h1>
          <p className="text-gray-600">Interactive training scenarios for compliance testing and team assessment</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Play className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Active Simulations</h3>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Participants</h3>
                <p className="text-2xl font-semibold text-gray-900">58</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Avg. Score</h3>
                <p className="text-2xl font-semibold text-gray-900">88%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Critical Issues</h3>
                <p className="text-2xl font-semibold text-gray-900">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Control Panel */}
        {activeSimulation && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Running: {scenarios.find(s => s.id === activeSimulation)?.title}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={simulationRunning ? pauseSimulation : () => setSimulationRunning(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {simulationRunning ? <Pause size={16} /> : <Play size={16} />}
                  <span className="ml-2">{simulationRunning ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  <RotateCcw size={16} />
                  <span className="ml-2">Reset</span>
                </button>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Progress</span>
                <span className="text-sm text-gray-500">{currentStep + 1} of {simulationSteps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / simulationSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step */}
            <div className="grid grid-cols-6 gap-2">
              {simulationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-center text-xs font-medium ${
                    index <= currentStep
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                {getStatusIcon(scenario.status)}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                  {scenario.difficulty}
                </span>
                <span className="text-xs text-gray-500">{scenario.category}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {scenario.duration}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {scenario.participants} participants
                </div>
              </div>

              {scenario.score && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Score</span>
                    <span className="font-semibold text-green-600">{scenario.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${scenario.score}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={() => startSimulation(scenario.id)}
                disabled={activeSimulation !== null}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  activeSimulation !== null
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : scenario.status === 'completed'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : scenario.status === 'in_progress'
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {scenario.status === 'completed' ? 'Restart' : 
                 scenario.status === 'in_progress' ? 'Continue' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
