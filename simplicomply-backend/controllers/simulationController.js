// Mock data for simulation functionality
const mockSimulations = [
  {
    id: 1,
    title: 'Phishing Attack Simulation',
    description: 'Test employee awareness against phishing attacks.',
    scenario: 'A fake email from a known vendor asking for login credentials.',
    status: 'completed',
    participants: 150,
    successRate: 0.75,
    createdAt: new Date('2024-06-20'),
    completedAt: new Date('2024-06-25')
  },
  {
    id: 2,
    title: 'Ransomware Attack Response',
    description: 'Simulate a ransomware attack to test the IT response team.',
    scenario: 'Key files on a server are encrypted, and a ransom note is displayed.',
    status: 'ongoing',
    participants: 10,
    successRate: null,
    createdAt: new Date('2024-07-15'),
    completedAt: null
  }
];

// Get all simulations
exports.getSimulations = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockSimulations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching simulations',
      error: error.message
    });
  }
};

// Get simulation by ID
exports.getSimulationById = async (req, res) => {
  try {
    const simulationId = parseInt(req.params.id);
    const simulation = mockSimulations.find(s => s.id === simulationId);

    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: 'Simulation not found'
      });
    }

    res.json({
      success: true,
      data: simulation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching simulation',
      error: error.message
    });
  }
};

