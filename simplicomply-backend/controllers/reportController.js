// Report mock data
const mockReportData = {
  reportSummaries: [
    {
      id: 1,
      title: 'Compliance Overview Q1',
      description: 'A summary of all compliance activities for Q1',
      createdBy: 'admin@example.com',
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: 2,
      title: 'Annual Risk Assessment 2024',
      description: 'Detailed risk assessment findings for the year 2024',
      createdBy: 'manager@example.com',
      createdAt: new Date('2025-02-01'),
      updatedAt: new Date('2025-02-05')
    }
  ],

  detailedReports: [
    {
      reportId: 1,
      content: 'Detailed content of the compliance overview Q1',
      sections: ['Introduction', 'Summary of Activities', 'Conclusions'],
      metrics: {
        complianceScore: 85,
        riskScore: 70
      }
    },
    {
      reportId: 2,
      content: 'Comprehensive findings from the annual risk assessment 2024',
      sections: ['Executive Summary', 'Risk Assessment Methodology', 'Findings', 'Recommendations'],
      metrics: {
        complianceScore: 78,
        riskScore: 65
      }
    }
  ]
};

// Get all report summaries
const getReportSummaries = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockReportData.reportSummaries
    });
  } catch (error) {
    console.error('Get report summaries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report summaries',
      error: error.message
    });
  }
};

// Get detailed report by ID
const getDetailedReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = mockReportData.detailedReports.find(r =>
      r.reportId === parseInt(id)
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Detailed report not found'
      });
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Get detailed report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch detailed report',
      error: error.message
    });
  }
};

module.exports = {
  getReportSummaries,
  getDetailedReport
};

