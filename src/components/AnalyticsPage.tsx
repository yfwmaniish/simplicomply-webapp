import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler
);

const AnalyticsPage: React.FC = () => {
  const complianceData = {
    labels: ['GDPR', 'PCI DSS', 'HIPAA', 'SOX', 'ISO 27001', 'CCPA'],
    datasets: [
      {
        label: 'Compliance Scores',
        data: [95, 88, 92, 75, 85, 78],
        backgroundColor: [
          '#3b82f6',
          '#34d399',
          '#fbbf24',
          '#f87171',
          '#a78bfa',
          '#f472b6',
        ],
      },
    ],
  };

  const trendData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Compliance Trend',
        data: [85, 90, 78, 88, 92, 95],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  };

  const riskData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Risk Distribution',
        data: [20, 30, 50],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Visual insights into compliance activities and risk assessments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Scores</h2>
            <div className="h-64">
              <Bar data={complianceData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Trend</h2>
            <div className="h-64">
              <Line data={trendData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Distribution</h2>
            <div className="h-64">
              <Pie data={riskData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
