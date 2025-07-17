import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink, Filter, Star, Clock, Download, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface LegalResource {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Article' | 'Guide' | 'Template' | 'Checklist';
  tags: string[];
  rating: number;
  readTime: string;
  isBookmarked: boolean;
}

const LawBridgePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const resources: LegalResource[] = [
    {
      id: '1',
      title: 'GDPR Compliance Implementation Guide',
      category: 'GDPR',
      description: 'Comprehensive guide for implementing GDPR compliance in your organization with step-by-step instructions.',
      lastUpdated: '2024-01-15',
      difficulty: 'Advanced',
      type: 'Guide',
      tags: ['Privacy', 'Data Protection', 'EU'],
      rating: 4.8,
      readTime: '45 min',
      isBookmarked: true
    },
    {
      id: '2',
      title: 'PCI DSS Security Requirements Checklist',
      category: 'PCI DSS',
      description: 'Complete checklist for PCI DSS compliance requirements and security controls.',
      lastUpdated: '2024-01-12',
      difficulty: 'Intermediate',
      type: 'Checklist',
      tags: ['Payment', 'Security', 'Compliance'],
      rating: 4.6,
      readTime: '20 min',
      isBookmarked: false
    },
    {
      id: '3',
      title: 'HIPAA Risk Assessment Template',
      category: 'HIPAA',
      description: 'Ready-to-use template for conducting HIPAA risk assessments in healthcare organizations.',
      lastUpdated: '2024-01-10',
      difficulty: 'Beginner',
      type: 'Template',
      tags: ['Healthcare', 'Risk Assessment', 'Privacy'],
      rating: 4.9,
      readTime: '30 min',
      isBookmarked: true
    },
    {
      id: '4',
      title: 'SOX Internal Controls Framework',
      category: 'SOX',
      description: 'Understanding and implementing internal controls under the Sarbanes-Oxley Act.',
      lastUpdated: '2024-01-08',
      difficulty: 'Advanced',
      type: 'Article',
      tags: ['Financial', 'Controls', 'Audit'],
      rating: 4.7,
      readTime: '35 min',
      isBookmarked: false
    },
    {
      id: '5',
      title: 'ISO 27001 Information Security Management',
      category: 'ISO 27001',
      description: 'Best practices for implementing ISO 27001 information security management systems.',
      lastUpdated: '2024-01-05',
      difficulty: 'Intermediate',
      type: 'Guide',
      tags: ['Security', 'Management', 'ISO'],
      rating: 4.5,
      readTime: '40 min',
      isBookmarked: true
    },
    {
      id: '6',
      title: 'CCPA Consumer Rights Response Guide',
      category: 'CCPA',
      description: 'Step-by-step guide for responding to consumer rights requests under CCPA.',
      lastUpdated: '2024-01-03',
      difficulty: 'Beginner',
      type: 'Guide',
      tags: ['Privacy', 'Consumer Rights', 'California'],
      rating: 4.4,
      readTime: '25 min',
      isBookmarked: false
    }
  ];

  const categories = ['All', 'GDPR', 'PCI DSS', 'HIPAA', 'SOX', 'ISO 27001', 'CCPA'];
  const types = ['All', 'Article', 'Guide', 'Template', 'Checklist'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return <BookOpen className="text-blue-500" size={20} />;
      case 'Guide': return <Shield className="text-green-500" size={20} />;
      case 'Template': return <Download className="text-purple-500" size={20} />;
      case 'Checklist': return <CheckCircle className="text-orange-500" size={20} />;
      default: return <BookOpen className="text-gray-500" size={20} />;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Law Bridge</h1>
          <p className="text-gray-600">Legal compliance resources, guides, and templates to help you navigate regulatory requirements</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources, guides, and templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Resources</h3>
                <p className="text-2xl font-semibold text-gray-900">{resources.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bookmarked</h3>
                <p className="text-2xl font-semibold text-gray-900">{resources.filter(r => r.isBookmarked).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Compliance Areas</h3>
                <p className="text-2xl font-semibold text-gray-900">{categories.length - 1}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Avg. Read Time</h3>
                <p className="text-2xl font-semibold text-gray-900">32 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getTypeIcon(resource.type)}
                  <span className="ml-2 text-sm font-medium text-gray-600">{resource.type}</span>
                </div>
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star size={20} className={resource.isBookmarked ? 'text-yellow-500 fill-current' : ''} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {resource.category}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {resource.readTime}
                </div>
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {renderStars(resource.rating)}
                  </div>
                  <span>{resource.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                </span>
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all resources.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawBridgePage;
