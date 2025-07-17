// Mock analytics data
const mockAnalyticsData = {
  complianceScores: [
    {
      framework: 'GDPR',
      score: 85,
      trend: 'increasing',
      lastUpdated: new Date('2024-01-15'),
      details: {
        dataProtection: 90,
        privacyRights: 80,
        consentManagement: 85,
        breachResponse: 88
      }
    },
    {
      framework: 'HIPAA',
      score: 92,
      trend: 'stable',
      lastUpdated: new Date('2024-01-14'),
      details: {
        privacyRule: 95,
        securityRule: 90,
        breachNotification: 88,
        adminSafeguards: 94
      }
    },
    {
      framework: 'SOX',
      score: 78,
      trend: 'decreasing',
      lastUpdated: new Date('2024-01-13'),
      details: {
        internalControls: 82,
        financialReporting: 75,
        auditCompliance: 76,
        disclosureControls: 79
      }
    },
    {
      framework: 'PCI DSS',
      score: 81,
      trend: 'increasing',
      lastUpdated: new Date('2024-01-12'),
      details: {
        networkSecurity: 85,
        dataProtection: 78,
        vulnerabilityManagement: 83,
        accessControl: 79
      }
    }
  ],

  riskAssessments: [
    {
      id: 1,
      category: 'Data Privacy',
      riskLevel: 'High',
      score: 8.5,
      impact: 'High',
      probability: 'Medium',
      status: 'Active',
      assessedAt: new Date('2024-01-10'),
      mitigationPlan: 'Enhanced data encryption and access controls'
    },
    {
      id: 2,
      category: 'Cybersecurity',
      riskLevel: 'Medium',
      score: 6.2,
      impact: 'Medium',
      probability: 'Medium',
      status: 'Mitigated',
      assessedAt: new Date('2024-01-08'),
      mitigationPlan: 'Regular security audits and staff training'
    },
    {
      id: 3,
      category: 'Regulatory Changes',
      riskLevel: 'Low',
      score: 3.8,
      impact: 'Low',
      probability: 'Low',
      status: 'Monitored',
      assessedAt: new Date('2024-01-05'),
      mitigationPlan: 'Continuous monitoring of regulatory updates'
    },
    {
      id: 4,
      category: 'Financial Reporting',
      riskLevel: 'Medium',
      score: 5.9,
      impact: 'High',
      probability: 'Low',
      status: 'Active',
      assessedAt: new Date('2024-01-12'),
      mitigationPlan: 'Enhanced internal controls and documentation'
    }
  ],

  trainingMetrics: [
    {
      module: 'GDPR Fundamentals',
      completionRate: 87,
      averageScore: 89,
      timeToComplete: '42 minutes',
      enrollments: 245,
      completions: 213,
      passRate: 95
    },
    {
      module: 'HIPAA Privacy Training',
      completionRate: 92,
      averageScore: 94,
      timeToComplete: '55 minutes',
      enrollments: 156,
      completions: 143,
      passRate: 98
    },
    {
      module: 'SOX Compliance Training',
      completionRate: 74,
      averageScore: 81,
      timeToComplete: '85 minutes',
      enrollments: 89,
      completions: 66,
      passRate: 88
    },
    {
      module: 'PCI DSS Security Standards',
      completionRate: 81,
      averageScore: 86,
      timeToComplete: '68 minutes',
      enrollments: 123,
      completions: 99,
      passRate: 92
    }
  ],

  auditHistory: [
    {
      id: 1,
      auditType: 'Internal Audit',
      framework: 'GDPR',
      status: 'Completed',
      score: 85,
      findings: 12,
      criticalFindings: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      auditor: 'Internal Audit Team'
    },
    {
      id: 2,
      auditType: 'External Audit',
      framework: 'SOX',
      status: 'In Progress',
      score: null,
      findings: 8,
      criticalFindings: 1,
      startDate: new Date('2024-01-10'),
      endDate: null,
      auditor: 'External Audit Firm'
    },
    {
      id: 3,
      auditType: 'Compliance Review',
      framework: 'HIPAA',
      status: 'Completed',
      score: 92,
      findings: 5,
      criticalFindings: 0,
      startDate: new Date('2023-12-15'),
      endDate: new Date('2024-01-05'),
      auditor: 'Compliance Team'
    }
  ],

  performanceTrends: {
    complianceScoreHistory: [
      { date: '2024-01-01', score: 82 },
      { date: '2024-01-05', score: 84 },
      { date: '2024-01-10', score: 86 },
      { date: '2024-01-15', score: 84 }
    ],
    riskScoreHistory: [
      { date: '2024-01-01', score: 6.5 },
      { date: '2024-01-05', score: 6.2 },
      { date: '2024-01-10', score: 6.8 },
      { date: '2024-01-15', score: 6.1 }
    ],
    trainingCompletionHistory: [
      { date: '2024-01-01', completionRate: 78 },
      { date: '2024-01-05', completionRate: 82 },
      { date: '2024-01-10', completionRate: 86 },
      { date: '2024-01-15', completionRate: 84 }
    ]
  }
};

// Get overall compliance dashboard data
const getComplianceDashboard = async (req, res) => {
  try {
    const averageComplianceScore = Math.round(
      mockAnalyticsData.complianceScores.reduce((sum, item) => sum + item.score, 0) / 
      mockAnalyticsData.complianceScores.length
    );

    const averageRiskScore = Math.round(
      mockAnalyticsData.riskAssessments.reduce((sum, item) => sum + item.score, 0) / 
      mockAnalyticsData.riskAssessments.length * 10
    ) / 10;

    const averageTrainingCompletion = Math.round(
      mockAnalyticsData.trainingMetrics.reduce((sum, item) => sum + item.completionRate, 0) / 
      mockAnalyticsData.trainingMetrics.length
    );

    const dashboard = {
      overview: {
        averageComplianceScore,
        averageRiskScore,
        averageTrainingCompletion,
        totalActiveRisks: mockAnalyticsData.riskAssessments.filter(r => r.status === 'Active').length,
        totalAudits: mockAnalyticsData.auditHistory.length,
        ongoingAudits: mockAnalyticsData.auditHistory.filter(a => a.status === 'In Progress').length
      },
      complianceScores: mockAnalyticsData.complianceScores,
      recentRisks: mockAnalyticsData.riskAssessments.slice(0, 5),
      trainingOverview: mockAnalyticsData.trainingMetrics
    };

    res.json({
      success: true,
      data: dashboard
    });
  } catch (error) {
    console.error('Get compliance dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch compliance dashboard',
      error: error.message
    });
  }
};

// Get detailed compliance scores
const getComplianceScores = async (req, res) => {
  try {
    const { framework } = req.query;
    
    let scores = mockAnalyticsData.complianceScores;
    
    if (framework) {
      scores = scores.filter(score => 
        score.framework.toLowerCase().includes(framework.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      data: scores
    });
  } catch (error) {
    console.error('Get compliance scores error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch compliance scores',
      error: error.message
    });
  }
};

// Get risk assessment data
const getRiskAssessments = async (req, res) => {
  try {
    const { category, riskLevel, status } = req.query;
    
    let risks = mockAnalyticsData.riskAssessments;
    
    if (category) {
      risks = risks.filter(risk => 
        risk.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (riskLevel) {
      risks = risks.filter(risk => risk.riskLevel === riskLevel);
    }
    
    if (status) {
      risks = risks.filter(risk => risk.status === status);
    }
    
    const riskSummary = {
      totalRisks: risks.length,
      highRisks: risks.filter(r => r.riskLevel === 'High').length,
      mediumRisks: risks.filter(r => r.riskLevel === 'Medium').length,
      lowRisks: risks.filter(r => r.riskLevel === 'Low').length,
      activeRisks: risks.filter(r => r.status === 'Active').length,
      mitigatedRisks: risks.filter(r => r.status === 'Mitigated').length
    };
    
    res.json({
      success: true,
      data: {
        summary: riskSummary,
        risks: risks
      }
    });
  } catch (error) {
    console.error('Get risk assessments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch risk assessments',
      error: error.message
    });
  }
};

// Get training analytics
const getTrainingAnalytics = async (req, res) => {
  try {
    const { module } = req.query;
    
    let metrics = mockAnalyticsData.trainingMetrics;
    
    if (module) {
      metrics = metrics.filter(metric => 
        metric.module.toLowerCase().includes(module.toLowerCase())
      );
    }
    
    const summary = {
      totalEnrollments: metrics.reduce((sum, m) => sum + m.enrollments, 0),
      totalCompletions: metrics.reduce((sum, m) => sum + m.completions, 0),
      averageCompletionRate: Math.round(
        metrics.reduce((sum, m) => sum + m.completionRate, 0) / metrics.length
      ),
      averageScore: Math.round(
        metrics.reduce((sum, m) => sum + m.averageScore, 0) / metrics.length
      ),
      averagePassRate: Math.round(
        metrics.reduce((sum, m) => sum + m.passRate, 0) / metrics.length
      )
    };
    
    res.json({
      success: true,
      data: {
        summary,
        metrics
      }
    });
  } catch (error) {
    console.error('Get training analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training analytics',
      error: error.message
    });
  }
};

// Get audit history
const getAuditHistory = async (req, res) => {
  try {
    const { framework, status, auditType } = req.query;
    
    let audits = mockAnalyticsData.auditHistory;
    
    if (framework) {
      audits = audits.filter(audit => audit.framework === framework);
    }
    
    if (status) {
      audits = audits.filter(audit => audit.status === status);
    }
    
    if (auditType) {
      audits = audits.filter(audit => audit.auditType === auditType);
    }
    
    const auditSummary = {
      totalAudits: audits.length,
      completedAudits: audits.filter(a => a.status === 'Completed').length,
      inProgressAudits: audits.filter(a => a.status === 'In Progress').length,
      totalFindings: audits.reduce((sum, a) => sum + a.findings, 0),
      totalCriticalFindings: audits.reduce((sum, a) => sum + a.criticalFindings, 0),
      averageScore: Math.round(
        audits.filter(a => a.score !== null).reduce((sum, a) => sum + a.score, 0) / 
        audits.filter(a => a.score !== null).length
      )
    };
    
    res.json({
      success: true,
      data: {
        summary: auditSummary,
        audits
      }
    });
  } catch (error) {
    console.error('Get audit history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit history',
      error: error.message
    });
  }
};

// Get performance trends
const getPerformanceTrends = async (req, res) => {
  try {
    const { metric, period } = req.query;
    
    let trends = mockAnalyticsData.performanceTrends;
    
    if (metric) {
      const trendData = {};
      switch (metric) {
        case 'compliance':
          trendData.complianceScoreHistory = trends.complianceScoreHistory;
          break;
        case 'risk':
          trendData.riskScoreHistory = trends.riskScoreHistory;
          break;
        case 'training':
          trendData.trainingCompletionHistory = trends.trainingCompletionHistory;
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid metric parameter'
          });
      }
      trends = trendData;
    }
    
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Get performance trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch performance trends',
      error: error.message
    });
  }
};

module.exports = {
  getComplianceDashboard,
  getComplianceScores,
  getRiskAssessments,
  getTrainingAnalytics,
  getAuditHistory,
  getPerformanceTrends
};
