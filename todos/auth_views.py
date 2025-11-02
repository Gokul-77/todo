from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework_simplejwt.tokens import RefreshToken
import json


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    """
    Register a new user
    Expected JSON: { "username": "user", "email": "user@example.com", "password": "pass" }
    """
    try:
        data = json.loads(request.body)
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        # Validation
        if not username or not password:
            return JsonResponse({
                'success': False,
                'error': 'Username and password are required'
            }, status=400)
        
        if len(password) < 6:
            return JsonResponse({
                'success': False,
                'error': 'Password must be at least 6 characters'
            }, status=400)
        
        # Check if user exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                'success': False,
                'error': 'Username already exists'
            }, status=400)
        
        if email and User.objects.filter(email=email).exists():
            return JsonResponse({
                'success': False,
                'error': 'Email already registered'
            }, status=400)
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'success': True,
            'message': 'User registered successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    """
    Login user
    Expected JSON: { "username": "user", "password": "pass" }
    """
    try:
        data = json.loads(request.body)
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return JsonResponse({
                'success': False,
                'error': 'Username and password are required'
            }, status=400)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is None:
            return JsonResponse({
                'success': False,
                'error': 'Invalid username or password'
            }, status=401)
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def refresh_token(request):
    """
    Refresh access token
    Expected JSON: { "refresh": "refresh_token" }
    """
    try:
        data = json.loads(request.body)
        refresh_token = data.get('refresh')
        
        if not refresh_token:
            return JsonResponse({
                'success': False,
                'error': 'Refresh token is required'
            }, status=400)
        
        refresh = RefreshToken(refresh_token)
        
        return JsonResponse({
            'success': True,
            'access': str(refresh.access_token)
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': 'Invalid or expired refresh token'
        }, status=401)


@require_http_methods(["GET"])
def get_current_user(request):
    """
    Get current authenticated user info
    Requires JWT token in Authorization header
    """
    if not request.user.is_authenticated:
        return JsonResponse({
            'success': False,
            'error': 'Not authenticated'
        }, status=401)
    
    return JsonResponse({
        'success': True,
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    })
