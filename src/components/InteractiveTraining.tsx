import React, { useState } from 'react';
import { BookOpen, ExternalLink, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  content: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InteractiveTraining: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(62);

  const articles: Article[] = [
    {
      id: 'gdpr-6',
      title: 'GDPR Article 6',
      category: 'Lawfulness of processing',
      description: 'Processing shall be lawful only if and to the extent that at least one of the following applies...',
      priority: 'high',
      content: 'Full article content would go here...'
    },
    {
      id: 'gdpr-7',
      title: 'GDPR Article 7',
      category: 'Conditions for consent',
      description: 'Where processing is based on consent, the controller shall be able to demonstrate...',
      priority: 'medium',
      content: 'Full article content would go here...'
    },
    {
      id: 'gdpr-13',
      title: 'GDPR Article 13',
      category: 'Information to be provided',
      description: 'Where personal data relating to a data subject are collected from the data subject...',
      priority: 'high',
      content: 'Full article content would go here...'
    },
    {
      id: 'gdpr-35',
      title: 'Data Protection Impact Assessment',
      category: 'GDPR Article 35',
      description: 'Where a type of processing is likely to result in a high risk to the rights and freedoms...',
      priority: 'low',
      content: 'Full article content would go here...'
    }
  ];

  const currentQuestion: Question = {
    id: 'q1',
    question: 'What is your immediate response to this customer data access request?',
    options: [
      'A. Immediately provide all customer data in our database via email',
      'B. Verify the customer\'s identity first, then provide a structured response within 30 days',
      'C. Ignore the request since it wasn\'t submitted through official channels',
      'D. Ask the customer to pay a processing fee before handling the request'
    ],
    correctAnswer: 1,
    explanation: 'Under GDPR Article 12, you must verify the requester\'s identity and provide a response within one month (30 days). The response should be structured and secure.'
  };

  const scenario = {
    title: 'Customer Data Request Scenario',
    description: 'A customer has submitted a request to access all personal data your company holds about them. They want to know what data you have, how it\'s being used, and who it\'s been shared with.',
    context: 'The customer submitted this request via email 2 days ago. Your company processes customer data for marketing, customer service, and analytics purposes. Some data has been shared with third-party analytics providers.'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCurrentProgress(Math.min(currentProgress + 10, 100));
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    // In a real app, this would load the next question
  };

  const handleShowDetailedFeedback = () => {
    setShowDetailedFeedback(true);
  };

  const feedbackData = {
    correctAnswer: {
      impact: "Excellent! Your response demonstrates a strong understanding of GDPR compliance requirements.",
      consequences: "This approach ensures legal compliance while maintaining customer trust and avoiding potential fines.",
      keyPoints: [
        "Identity verification is mandatory under GDPR Article 12",
        "30-day response timeframe is legally required",
        "Structured data format protects both customer and company",
        "Proper documentation creates audit trail"
      ],
      nextSteps: "Continue with advanced data subject rights scenarios to build expertise."
    },
    incorrectAnswer: {
      impact: "This response could lead to GDPR violations and potential legal consequences.",
      consequences: "Improper handling of data subject requests can result in fines up to €20 million or 4% of annual turnover.",
      keyPoints: [
        "Always verify identity before releasing personal data",
        "Response timeframe is legally mandated, not optional",
        "Ignoring requests is a serious GDPR violation",
        "Processing fees for basic requests are prohibited"
      ],
      nextSteps: "Review GDPR Articles 12-15 and practice with similar scenarios."
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Interactive scenario training</span>
          <span className="text-sm text-gray-500">{currentProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Articles */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reference Articles</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(article.priority)}`}>
                    {article.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{article.category}</p>
                <p className="text-sm text-gray-700 mb-3">{article.description}</p>
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Scenario Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">{scenario.title}</h1>
              </div>
              <p className="text-gray-700 mb-4">{scenario.description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context:</h3>
                <p className="text-blue-800">{scenario.context}</p>
              </div>
            </div>

            {/* Question Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h2>
              
              <div className="space-y-4 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Result Section */}
              {showResult && (
                <div className={`p-4 rounded-lg mb-6 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                    )}
                    <div>
                      <p className={`font-medium ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p className={`text-sm mt-1 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleShowDetailedFeedback}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  View Detailed Feedback
                </button>
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Next Question
                </button>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetailedFeedback 

        && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg max-w-xl mx-auto p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Detailed Feedback</h2>
                <button onClick={() => setShowDetailedFeedback(false)}>
                  <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium text-gray-700">Impact Assessment</h3>
                  <p className="text-sm text-gray-600">{selectedAnswer === currentQuestion.correctAnswer 
                      ? feedbackData.correctAnswer.impact 
                      : feedbackData.incorrectAnswer.impact}
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">Consequences</h3>
                  <p className="text-sm text-gray-600">{selectedAnswer === currentQuestion.correctAnswer 
                      ? feedbackData.correctAnswer.consequences 
                      : feedbackData.incorrectAnswer.consequences}
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">Key Points</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {(selectedAnswer === currentQuestion.correctAnswer 
                      ? feedbackData.correctAnswer.keyPoints 
                      : feedbackData.incorrectAnswer.keyPoints).map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">Next Steps</h3>
                  <p className="text-sm text-gray-600">{selectedAnswer === currentQuestion.correctAnswer 
                      ? feedbackData.correctAnswer.nextSteps 
                      : feedbackData.incorrectAnswer.nextSteps}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailedFeedback(false)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default InteractiveTraining;
