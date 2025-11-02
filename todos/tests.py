from django.test import TestCase, Client
from django.utils import timezone
from .models import Todo
import json


class TodoModelTest(TestCase):
    """Test cases for Todo model"""
    
    def setUp(self):
        self.todo = Todo.objects.create(text="Test todo item")
    
    def test_todo_creation(self):
        """Test that a todo is created correctly"""
        self.assertEqual(self.todo.text, "Test todo item")
        self.assertFalse(self.todo.is_finished)
        self.assertIsNotNone(self.todo.created_at)
        self.assertIsNone(self.todo.finished_at)
    
    def test_todo_str(self):
        """Test string representation"""
        self.assertIn("Test todo item", str(self.todo))
    
    def test_todo_to_dict(self):
        """Test to_dict method"""
        todo_dict = self.todo.to_dict()
        self.assertEqual(todo_dict['text'], "Test todo item")
        self.assertFalse(todo_dict['is_finished'])
        self.assertIsNotNone(todo_dict['created_at'])
    
    def test_finish_todo(self):
        """Test finishing a todo"""
        self.todo.is_finished = True
        self.todo.finished_at = timezone.now()
        self.todo.save()
        
        self.assertTrue(self.todo.is_finished)
        self.assertIsNotNone(self.todo.finished_at)


class TodoAPITest(TestCase):
    """Test cases for Todo API endpoints"""
    
    def setUp(self):
        self.client = Client()
        self.todo = Todo.objects.create(text="Test API todo")
    
    def test_get_todos(self):
        """Test GET /api/todos/"""
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        self.assertEqual(len(data['todos']), 1)
    
    def test_create_todo(self):
        """Test POST /api/todos/create/"""
        response = self.client.post(
            '/api/todos/create/',
            data=json.dumps({'text': 'New todo'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        self.assertEqual(data['todo']['text'], 'New todo')
        
        # Verify it was saved
        self.assertEqual(Todo.objects.count(), 2)
    
    def test_create_todo_empty_text(self):
        """Test creating todo with empty text"""
        response = self.client.post(
            '/api/todos/create/',
            data=json.dumps({'text': ''}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        
        data = json.loads(response.content)
        self.assertFalse(data['success'])
    
    def test_get_single_todo(self):
        """Test GET /api/todos/<id>/"""
        response = self.client.get(f'/api/todos/{self.todo.id}/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        self.assertEqual(data['todo']['id'], self.todo.id)
    
    def test_finish_todo(self):
        """Test PUT /api/todos/<id>/finish/"""
        response = self.client.put(f'/api/todos/{self.todo.id}/finish/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        self.assertTrue(data['todo']['is_finished'])
        self.assertIsNotNone(data['todo']['finished_at'])
        
        # Verify in database
        self.todo.refresh_from_db()
        self.assertTrue(self.todo.is_finished)
    
    def test_unfinish_todo(self):
        """Test PUT /api/todos/<id>/unfinish/"""
        # First finish it
        self.todo.is_finished = True
        self.todo.finished_at = timezone.now()
        self.todo.save()
        
        # Then unfinish it
        response = self.client.put(f'/api/todos/{self.todo.id}/unfinish/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        self.assertFalse(data['todo']['is_finished'])
        self.assertIsNone(data['todo']['finished_at'])
    
    def test_delete_todo(self):
        """Test DELETE /api/todos/<id>/delete/"""
        todo_id = self.todo.id
        response = self.client.delete(f'/api/todos/{todo_id}/delete/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertTrue(data['success'])
        
        # Verify it was deleted
        self.assertEqual(Todo.objects.filter(id=todo_id).count(), 0)
    
    def test_get_nonexistent_todo(self):
        """Test getting a todo that doesn't exist"""
        response = self.client.get('/api/todos/9999/')
        self.assertEqual(response.status_code, 404)
        
        data = json.loads(response.content)
        self.assertFalse(data['success'])
