from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('text', 'is_finished', 'created_at', 'finished_at')
    list_filter = ('is_finished', 'created_at')
    search_fields = ('text',)
    readonly_fields = ('created_at', 'finished_at')
