from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from .models import Task
from .serializers import TaskSerializer, UserSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def toggle(self, request, pk=None):
        task = self.get_object()
        task.completed = not task.completed
        task.save()
        serializer = self.get_serializer(task)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def suggestions(self, request):
        # Simple AI suggestions based on user's task history
        user_tasks = Task.objects.filter(user=request.user)
        
        suggestions = [
            {
                'title': 'Review and organize your tasks',
                'reason': 'Based on your task patterns, consider reviewing your priorities',
                'priority': 'Medium',
                'category': 'Personal'
            },
            {
                'title': 'Plan for tomorrow',
                'reason': 'It\'s a good time to plan your next day',
                'priority': 'Low',
                'category': 'Personal'
            }
        ]
        
        # Add more contextual suggestions based on user's tasks
        if user_tasks.filter(completed=False).count() > 5:
            suggestions.append({
                'title': 'Complete pending tasks',
                'reason': 'You have several pending tasks that need attention',
                'priority': 'High',
                'category': 'Work'
            })
        
        return Response(suggestions)

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        
        if not username or not password or not email:
            return Response(
                {'message': 'Username, email, and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if password != confirm_password:
            return Response(
                {'message': 'Passwords do not match'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(username=username).exists():
            return Response(
                {'message': 'Username already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {'message': 'Email already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'message': 'Error creating user'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'message': 'Username and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        else:
            return Response(
                {'message': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        if request.user.is_authenticated:
            # Delete the token
            try:
                request.user.auth_token.delete()
            except:
                pass
        return Response({'message': 'Logged out successfully'})
    
    @action(detail=False, methods=['get'])
    def user(self, request):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)
        else:
            return Response(
                {'message': 'Not authenticated'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    @action(detail=False, methods=['get'])
    def csrf(self, request):
        return JsonResponse({'csrfToken': 'not-needed-for-token-auth'}) 