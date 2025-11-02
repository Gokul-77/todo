from django.urls import path
from . import views, auth_views

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', auth_views.register, name='register'),
    path('auth/login/', auth_views.login, name='login'),
    path('auth/refresh/', auth_views.refresh_token, name='refresh_token'),
    path('auth/me/', auth_views.get_current_user, name='current_user'),
    
    # Todo endpoints (require authentication)
    path('todos/', views.get_todos, name='get_todos'),
    path('todos/create/', views.create_todo, name='create_todo'),
    path('todos/<int:todo_id>/', views.get_todo, name='get_todo'),
    path('todos/<int:todo_id>/finish/', views.finish_todo, name='finish_todo'),
    path('todos/<int:todo_id>/unfinish/', views.unfinish_todo, name='unfinish_todo'),
    path('todos/<int:todo_id>/delete/', views.delete_todo, name='delete_todo'),
]
