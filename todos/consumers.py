import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User


class TodoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Handle WebSocket connection"""
        # Get user from scope (set by AuthMiddlewareStack)
        self.user = self.scope['user']
        
        if self.user.is_authenticated:
            # Create a group for this user
            self.group_name = f'user_{self.user.id}'
            
            # Join user group
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            
            await self.accept()
            
            # Send connection confirmation
            await self.send(text_data=json.dumps({
                'type': 'connection',
                'message': 'Connected to todo updates',
                'user': self.user.username
            }))
        else:
            # Reject unauthenticated connections
            await self.close()
    
    async def disconnect(self, close_code):
        """Handle WebSocket disconnection"""
        if hasattr(self, 'group_name'):
            # Leave user group
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
    
    async def receive(self, text_data):
        """Handle messages from WebSocket"""
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            # Echo back for ping/pong
            if message_type == 'ping':
                await self.send(text_data=json.dumps({
                    'type': 'pong',
                    'timestamp': data.get('timestamp')
                }))
        except json.JSONDecodeError:
            pass
    
    async def todo_update(self, event):
        """Handle todo update events from channel layer"""
        # Send todo update to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'todo_update',
            'action': event['action'],
            'todo': event['todo']
        }))
