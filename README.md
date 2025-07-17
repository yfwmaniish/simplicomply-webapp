# SimpliComply Web Application

A comprehensive compliance management platform built with React and Node.js, designed to help organizations streamline their compliance processes through interactive training, simulations, and real-time monitoring.

## 🌟 Features

### Dashboard
- **Real-time Compliance Metrics**: Track compliance scores across multiple frameworks (GDPR, HIPAA, SOX, PCI DSS, ISO 27001, CCPA)
- **Activity Monitoring**: View recent activities, pending reviews, and system alerts
- **Deadline Management**: Track upcoming compliance deadlines with progress indicators
- **Quick Actions**: Easy access to simulations, reports, user management, and training resources

### Core Modules
- **Interactive Training**: Comprehensive compliance training modules
- **Simulation Engine**: Risk scenario simulations for compliance testing
- **Analytics Dashboard**: Advanced reporting and analytics
- **Admin Panel**: User management and system configuration
- **Consultant Portal**: External consultant access and collaboration
- **Law Bridge**: Legal compliance integration
- **Profile Management**: User profile and settings

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - development mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yfwmaniish/simplicomply-webapp.git
   cd simplicomply-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd simplicomply-backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `simplicomply-backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/simplicomply
   JWT_SECRET=your-jwt-secret-key
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Individual Services
Run frontend only:
```bash
npm start
```

Run backend only:
```bash
npm run backend
```

### Test Users (Development Mode)
When running without MongoDB, you can use these test accounts:
- **User**: test@example.com / password123
- **Admin**: admin@example.com / admin123  
- **Manager**: manager@example.com / manager123

## 🏗️ Architecture

### Frontend
- **Framework**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js with React Chart.js 2
- **UI Components**: Headless UI

### Backend
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer
- **Validation**: Express Validator, Joi

## 📁 Project Structure

```
simplicomply-webapp/
├── public/                     # Static files
├── src/
│   ├── components/            # React components
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── LoginPage.tsx      # Authentication
│   │   ├── AdminPanel.tsx     # Admin interface
│   │   ├── SimulationPage.tsx # Risk simulations
│   │   └── ...
│   ├── services/             # API services
│   └── App.tsx               # Main app component
├── simplicomply-backend/
│   ├── controllers/          # Business logic
│   ├── middleware/           # Express middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── server.js            # Entry point
└── package.json
```

## 🔧 API Endpoints

### Dashboard
- `GET /api/dashboard` - Get complete dashboard overview
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/deadlines` - Get upcoming deadlines
- `GET /api/dashboard/compliance` - Get compliance metrics
- `GET /api/dashboard/alerts` - Get system alerts

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Additional Endpoints
- `GET /api/health` - Health check
- `/api/training` - Training modules
- `/api/simulation` - Simulation engine
- `/api/analytics` - Analytics data
- `/api/reports` - Report generation
- `/api/admin` - Admin functions

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Run both frontend and backend
npm run frontend     # Run frontend only
npm run backend      # Run backend only

# Production
npm run build        # Build frontend for production
npm start            # Start frontend production server

# Testing
npm test            # Run tests
```

### Development Features
- **Hot Reload**: Automatic refresh during development
- **Mock Data**: Works without database connection
- **CORS Enabled**: Cross-origin requests configured
- **Rate Limiting**: API protection enabled
- **Security Headers**: Helmet.js security middleware

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Security headers with Helmet
- Input validation and sanitization
- File upload restrictions

## 📊 Compliance Frameworks Supported

- **GDPR** (General Data Protection Regulation)
- **HIPAA** (Health Insurance Portability and Accountability Act)
- **SOX** (Sarbanes-Oxley Act)
- **PCI DSS** (Payment Card Industry Data Security Standard)
- **ISO 27001** (Information Security Management)
- **CCPA** (California Consumer Privacy Act)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- MongoDB connection is optional in development mode
- File upload functionality requires additional configuration
- Real-time features require WebSocket implementation

## 🚧 Roadmap

- [ ] WebSocket integration for real-time updates
- [ ] Advanced reporting dashboard
- [ ] Email notification system
- [ ] Mobile responsive improvements
- [ ] Multi-language support
- [ ] Advanced role-based permissions
- [ ] Integration with external compliance tools

## 📞 Support

For support, email manishtiwari5398@gmail.com or create an issue in the GitHub repository.

## 🏆 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons
- MongoDB team for the database solution

---

**Built with ❤️ by [yfwmaniish](https://github.com/yfwmaniish)**
