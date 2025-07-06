# AI To-Do Application

A modern, full-stack task management application built with Django REST API backend and React frontend, featuring AI-powered task suggestions and a beautiful Material-UI interface.

## 🚀 Features

- **User Authentication**: Secure login/signup with token-based authentication
- **Task Management**: Create, edit, delete, and toggle task completion
- **Task Categories**: Organize tasks by Work, Personal, Home, Health, Learning, Finance
- **Priority Levels**: Set Low, Medium, or High priority for tasks
- **AI Suggestions**: Get intelligent task suggestions based on your patterns
- **Modern UI**: Beautiful Material-UI interface with responsive design
- **Real-time Updates**: Instant task updates without page refresh
- **Progress Tracking**: Visual progress indicators and statistics

## 🛠️ Tech Stack

### Backend
- **Django 5.2.4**: Web framework
- **Django REST Framework**: API development
- **SQLite**: Database (development)
- **Token Authentication**: Secure API access
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: User interface library
- **Material-UI**: Component library
- **Axios**: HTTP client
- **React Router**: Navigation
- **Context API**: State management

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd AI-to-do-application
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 🔐 Demo Credentials

- **Username**: admin
- **Password**: admin123

## 📁 Project Structure

```
AI-to-do-application/
├── backend/                 # Django settings
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── services/       # API services
├── tasks/                  # Django app
│   ├── api_views.py       # API views
│   ├── models.py          # Database models
│   └── serializers.py     # API serializers
├── templates/             # Django templates
├── manage.py             # Django management
└── requirements.txt      # Python dependencies
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

### CORS Settings
The application is configured to allow requests from:
- http://localhost:3000
- http://localhost:3001

## 🚀 Deployment

### Option 1: Vercel + Railway (Recommended)
1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy to Railway
3. **Database**: Use Railway PostgreSQL

### Option 2: Netlify + Render
1. **Frontend**: Deploy to Netlify
2. **Backend**: Deploy to Render
3. **Database**: Use Render PostgreSQL

### Option 3: AWS
1. **Frontend**: S3 + CloudFront
2. **Backend**: EC2 or Elastic Beanstalk
3. **Database**: RDS PostgreSQL

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user

### Tasks
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `GET /api/tasks/{id}/` - Get specific task
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task
- `PATCH /api/tasks/{id}/toggle/` - Toggle task completion
- `GET /api/tasks/suggestions/` - Get AI suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- Django REST Framework for the robust API
- React team for the amazing frontend framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by [Your Name]** 