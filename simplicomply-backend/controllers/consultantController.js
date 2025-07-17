// Mock data for consultant functionality
const mockConsultants = [
  {
    id: 1,
    name: 'John Doe',
    bio: 'Specialist in GDPR compliance with over 10 years of experience',
    projects: [
      { id: 101, name: 'Project Alpha', status: 'completed' },
      { id: 102, name: 'Project Beta', status: 'ongoing' }
    ],
    feedback: [
      { rating: 5, comment: 'Excellent support and guidance on data protection laws.' },
      { rating: 4, comment: 'Very knowledgeable but can improve on client interaction.' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    bio: 'Expert in cybersecurity and risk management',
    projects: [
      { id: 103, name: 'Project Gamma', status: 'pending' },
      { id: 104, name: 'Project Delta', status: 'completed' }
    ],
    feedback: [
      { rating: 4, comment: 'Great insights into security protocols.' },
      { rating: 5, comment: 'Handled complicated issues with ease.' }
    ]
  }
];

// Get consultant list
exports.getConsultants = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockConsultants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultants',
      error: error.message
    });
  }
};

// Get consultant by ID
exports.getConsultantById = async (req, res) => {
  try {
    const consultantId = parseInt(req.params.id);
    const consultant = mockConsultants.find(c => c.id === consultantId);

    if (!consultant) {
      return res.status(404).json({
        success: false,
        message: 'Consultant not found'
      });
    }

    res.json({
      success: true,
      data: consultant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultant',
      error: error.message
    });
  }
};

// Get consultant projects
exports.getConsultantProjects = async (req, res) => {
  try {
    const consultantId = parseInt(req.params.id);
    const consultant = mockConsultants.find(c => c.id === consultantId);

    if (!consultant) {
      return res.status(404).json({
        success: false,
        message: 'Consultant not found'
      });
    }

    res.json({
      success: true,
      data: consultant.projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultant projects',
      error: error.message
    });
  }
};

// Get consultant feedback
exports.getConsultantFeedback = async (req, res) => {
  try {
    const consultantId = parseInt(req.params.id);
    const consultant = mockConsultants.find(c => c.id === consultantId);

    if (!consultant) {
      return res.status(404).json({
        success: false,
        message: 'Consultant not found'
      });
    }

    res.json({
      success: true,
      data: consultant.feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultant feedback',
      error: error.message
    });
  }
};
