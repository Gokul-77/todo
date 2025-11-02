from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):
    """
    Todo model with timestamps and status tracking.
    Each todo is associated with a user.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos', help_text="Owner of the todo")
    text = models.TextField(help_text="Todo item text")
    is_finished = models.BooleanField(default=False, help_text="Whether the todo is completed")
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the todo was created")
    finished_at = models.DateTimeField(null=True, blank=True, help_text="When the todo was marked as finished")
    
    class Meta:
        ordering = ['-created_at']  # Most recent first
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['is_finished']),
        ]
    
    def __str__(self):
        status = "✓" if self.is_finished else "○"
        return f"{status} {self.text[:50]}"
    
    def to_dict(self):
        """Convert model instance to dictionary for JSON response"""
        return {
            'id': self.id,
            'text': self.text,
            'is_finished': self.is_finished,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'finished_at': self.finished_at.isoformat() if self.finished_at else None,
        }
