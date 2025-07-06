# Deployment Guide

This guide will help you deploy your AI To-Do application to Vercel (frontend) and Railway (backend).

## 🚀 Quick Deployment Steps

### 1. GitHub Repository Setup

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `ai-todo-app`
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/ai-todo-app.git
   git branch -M main
   git push -u origin main
   ```

### 2. Backend Deployment (Railway)

1. **Sign up for Railway**
   - Go to [Railway](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect Django and deploy

3. **Add PostgreSQL Database**
   - In your Railway project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically link it to your Django app

4. **Configure Environment Variables**
   - Go to your Django service settings
   - Add these environment variables:
     ```
     SECRET_KEY=your-secret-key-here
     DEBUG=False
     ALLOWED_HOSTS=your-railway-domain.railway.app
     ```

5. **Get Backend URL**
   - Copy your Railway app URL (e.g., `https://your-app.railway.app`)

### 3. Frontend Deployment (Vercel)

1. **Sign up for Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with your GitHub account

2. **Update API URL**
   - In `frontend/src/services/authService.js`, update the API_BASE_URL:
     ```javascript
     const API_BASE_URL = 'https://your-railway-app.railway.app';
     ```
   - In `frontend/src/services/taskService.js`, update the API_BASE_URL:
     ```javascript
     const API_BASE_URL = 'https://your-railway-app.railway.app';
     ```

3. **Deploy Frontend**
   - In Vercel, click "New Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Deploy

4. **Configure Environment Variables**
   - In Vercel project settings, add:
     ```
     REACT_APP_API_URL=https://your-railway-app.railway.app
     ```

### 4. Update CORS Settings

1. **Update Backend CORS**
   - In Railway, go to your Django service
   - Add environment variable:
     ```
     CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
     ```

2. **Redeploy Backend**
   - Railway will automatically redeploy when you add environment variables

## 🔧 Alternative Deployment Options

### Option 2: Netlify + Render

#### Backend (Render)
1. Sign up at [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`

#### Frontend (Netlify)
1. Sign up at [Netlify](https://netlify.com)
2. Connect your GitHub repo
3. Set build command: `cd frontend && npm run build`
4. Set publish directory: `frontend/build`

### Option 3: Heroku

#### Backend
1. Create `runtime.txt`:
   ```
   python-3.11.0
   ```
2. Update `Procfile`:
   ```
   web: gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
   ```
3. Deploy to Heroku

#### Frontend
1. Use Heroku buildpacks for React
2. Set build command in `package.json`:
   ```json
   {
     "scripts": {
       "heroku-postbuild": "cd frontend && npm install && npm run build"
     }
   }
   ```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure your frontend URL is in `CORS_ALLOWED_ORIGINS`
   - Check that the backend URL is correct in frontend services

2. **Database Connection Issues**
   - Verify database environment variables are set correctly
   - Check that migrations are running: `python manage.py migrate`

3. **Build Failures**
   - Check that all dependencies are in `requirements.txt`
   - Verify Node.js version compatibility

4. **Static Files Not Loading**
   - Make sure `whitenoise` is configured correctly
   - Run `python manage.py collectstatic` if needed

### Environment Variables Checklist

#### Backend (Railway/Render)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

#### Frontend (Vercel/Netlify)
```
REACT_APP_API_URL=https://your-backend-domain.com
```

## 📊 Monitoring

### Railway
- Check logs in Railway dashboard
- Monitor resource usage
- Set up alerts for downtime

### Vercel
- View deployment logs
- Monitor performance
- Set up analytics

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to Git
   - Use environment variables for all secrets

2. **HTTPS**
   - Both Vercel and Railway provide HTTPS by default
   - Enable HTTPS redirects in production settings

3. **Database Security**
   - Use strong passwords
   - Restrict database access
   - Regular backups

## 📈 Scaling

### Railway
- Upgrade to paid plan for more resources
- Add more instances for load balancing

### Vercel
- Automatic scaling included
- Edge functions for better performance

## 🎉 Success!

Once deployed, your app will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

Test all features to ensure everything works correctly in production! 