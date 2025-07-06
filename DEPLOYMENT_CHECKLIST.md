# 🚀 Deployment Checklist - AI To-Do Application

## ✅ **Pre-Deployment Checklist**

### **1. Environment Variables (CRITICAL)**

#### **Frontend (Vercel) Environment Variables:**
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### **Backend (Render) Environment Variables:**
```bash
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOST=your-app-name.onrender.com
FRONTEND_URL=https://your-frontend-url.vercel.app
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_HOST=your-database-host
DB_PORT=5432
```

### **2. Security Checklist**

- [ ] `DEBUG = False` in production
- [ ] `SECRET_KEY` is set via environment variable
- [ ] `ALLOWED_HOSTS` includes your production domain
- [ ] `CORS_ALLOW_ALL_ORIGINS = False` (removed)
- [ ] `CORS_ALLOWED_ORIGINS` includes your frontend URL
- [ ] Database credentials are secure
- [ ] Static files are properly configured

### **3. Database Setup**

- [ ] PostgreSQL database is provisioned
- [ ] Database credentials are set in environment variables
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`

### **4. Static Files**

- [ ] `STATIC_ROOT` is configured
- [ ] Run `python manage.py collectstatic`
- [ ] Static files are served by your hosting provider

### **5. API URLs Updated**

- [ ] Frontend services use `REACT_APP_API_URL` environment variable
- [ ] Backend CORS allows your frontend domain
- [ ] All API endpoints are accessible

### **6. Build Configuration**

#### **Frontend (Vercel):**
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`
- [ ] Install Command: `npm install`

#### **Backend (Render):**
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn backend.wsgi:application`
- [ ] Python Version: 3.12

### **7. Testing Checklist**

- [ ] User registration works
- [ ] User login works
- [ ] Task creation works
- [ ] Task updates work
- [ ] Task deletion works
- [ ] Authentication persists across page refreshes
- [ ] API endpoints return proper responses

### **8. Performance & Monitoring**

- [ ] Database queries are optimized
- [ ] Static files are cached
- [ ] Error logging is configured
- [ ] Health checks are working

## 🔧 **Quick Commands**

### **Generate Secret Key:**
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### **Test Local Production Build:**
```bash
# Frontend
cd frontend
npm run build

# Backend
python manage.py collectstatic
python manage.py migrate
gunicorn backend.wsgi:application
```

### **Check Environment Variables:**
```bash
# Frontend
echo $REACT_APP_API_URL

# Backend
echo $SECRET_KEY
echo $ALLOWED_HOST
echo $FRONTEND_URL
```

## 🚨 **Common Issues & Solutions**

1. **CORS Errors**: Ensure `FRONTEND_URL` is set correctly
2. **403 Forbidden**: Check `ALLOWED_HOSTS` and authentication
3. **Database Connection**: Verify database credentials
4. **Static Files 404**: Run `collectstatic` and check `STATIC_ROOT`
5. **API URL Issues**: Verify `REACT_APP_API_URL` is set correctly

## 📝 **Deployment URLs**

- **Frontend**: https://your-app-name.vercel.app
- **Backend**: https://your-app-name.onrender.com
- **GitHub**: https://github.com/Ravi-2064/Ai-todo-application

---

**Remember**: Always test in a staging environment first! 