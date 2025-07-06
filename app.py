"""
WSGI application entry point for deployment platforms.
This file allows platforms like Render, Railway, etc. to find the Django application.
"""

import os
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Import the WSGI application
from backend.wsgi import application

# Export the application
app = application 