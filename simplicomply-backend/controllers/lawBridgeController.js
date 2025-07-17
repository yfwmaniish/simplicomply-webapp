// Mock data for law bridge functionality
const mockLawBridges = [
  {
    id: 1,
    title: 'Data Privacy Laws Overview',
    description: 'Explore the fundamental principles of data privacy laws.',
    resources: [
      { type: 'article', title: 'GDPR Explained', link: 'https://www.example.com/gdpr-explained' },
      { type: 'video', title: 'CCPA Essentials', link: 'https://www.example.com/ccpa-essentials' },
    ],
    faqs: [
      { question: 'What is personal data?', answer: 'Data that can identify a person directly or indirectly.' },
      { question: 'How to comply with GDPR?', answer: 'Implement privacy by design, conduct regular audits.' }
    ]
  }
];

// Get law bridge topics
exports.getLawBridgeTopics = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockLawBridges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching law bridge topics',
      error: error.message
    });
  }
};

// Get law bridge topic by ID
exports.getLawBridgeTopicById = async (req, res) => {
  try {
    const topicId = parseInt(req.params.id);
    const topic = mockLawBridges.find(l => l.id === topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching law bridge topic',
      error: error.message
    });
  }
};

// Get resources for law bridge topic
exports.getLawBridgeResources = async (req, res) => {
  try {
    const topicId = parseInt(req.params.id);
    const topic = mockLawBridges.find(l => l.id === topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic.resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching law bridge resources',
      error: error.message
    });
  }
};

// Get FAQs for law bridge topic
exports.getLawBridgeFaqs = async (req, res) => {
  try {
    const topicId = parseInt(req.params.id);
    const topic = mockLawBridges.find(l => l.id === topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic.faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching law bridge FAQs',
      error: error.message
    });
  }
};

