from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status as http_status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from .models import Todo


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_todos(request):
    """
    Get all todos for the authenticated user, ordered by creation date (newest first)
    """
    try:
        todos = Todo.objects.filter(user=request.user)
        todos_list = [todo.to_dict() for todo in todos]
        return Response({
            'success': True,
            'todos': todos_list,
            'count': len(todos_list)
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_todo(request):
    """
    Create a new todo item for authenticated user
    Expected JSON: { "text": "Todo text" }
    """
    try:
        text = request.data.get('text', '').strip()
        
        if not text:
            return Response({
                'success': False,
                'error': 'Todo text is required'
            }, status=http_status.HTTP_400_BAD_REQUEST)
        
        todo = Todo.objects.create(user=request.user, text=text)
        
        return Response({
            'success': True,
            'todo': todo.to_dict(),
            'message': 'Todo created successfully'
        }, status=http_status.HTTP_201_CREATED)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def finish_todo(request, todo_id):
    """
    Mark a todo as finished
    Sets is_finished to True and records finished_at timestamp
    """
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
        
        if todo.is_finished:
            return JsonResponse({
                'success': False,
                'error': 'Todo is already finished'
            }, status=400)
        
        todo.is_finished = True
        todo.finished_at = timezone.now()
        todo.save()
        
        return Response({
            'success': True,
            'todo': todo.to_dict(),
            'message': 'Todo marked as finished'
        })
    except Todo.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Todo not found'
        }, status=http_status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def unfinish_todo(request, todo_id):
    """
    Mark a todo as unfinished
    Sets is_finished to False and clears finished_at timestamp
    """
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
        
        if not todo.is_finished:
            return Response({
                'success': False,
                'error': 'Todo is already unfinished'
            }, status=http_status.HTTP_400_BAD_REQUEST)
        
        todo.is_finished = False
        todo.finished_at = None
        todo.save()
        
        return Response({
            'success': True,
            'todo': todo.to_dict(),
            'message': 'Todo marked as unfinished'
        })
    except Todo.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Todo not found'
        }, status=http_status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_todo(request, todo_id):
    """
    Delete a todo item
    """
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
        todo_dict = todo.to_dict()
        todo.delete()
        
        return Response({
            'success': True,
            'todo': todo_dict,
            'message': 'Todo deleted successfully'
        })
    except Todo.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Todo not found'
        }, status=http_status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_todo(request, todo_id):
    """
    Get a single todo by ID
    """
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
        return Response({
            'success': True,
            'todo': todo.to_dict()
        })
    except Todo.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Todo not found'
        }, status=http_status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
