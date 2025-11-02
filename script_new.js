// API Configuration
const API_BASE_URL = "https://todo-backend-gokul.onrender.com/api";

const WS_BASE_URL = 'ws://localhost:8000/ws/todos/';

// State
let todos = [];
let websocket = null;
let reconnectInterval = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Load user info
    loadUserInfo();
    
    // Setup
    loadTodos();
    setupEventListeners();
    loadTheme();
    
    // Connect WebSocket
    connectWebSocket();
});

// User Management
function loadUserInfo() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('username-display').textContent = user.username;
        document.getElementById('user-menu-name').textContent = user.username;
        document.getElementById('user-avatar').textContent = user.username.charAt(0).toUpperCase();
    }
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    if (websocket) {
        websocket.close();
    }
    
    window.location.href = 'auth.html';
}

// WebSocket Management
function connectWebSocket() {
    const token = localStorage.getItem('access_token');
    
    try {
        // Note: For JWT auth with WebSocket, you might need to pass token in URL or use a custom protocol
        websocket = new WebSocket(WS_BASE_URL);
        
        websocket.onopen = () => {
            console.log('WebSocket connected');
            clearInterval(reconnectInterval);
            
            // Send ping every 30 seconds to keep connection alive
            setInterval(() => {
                if (websocket.readyState === WebSocket.OPEN) {
                    websocket.send(JSON.stringify({
                        type: 'ping',
                        timestamp: new Date().toISOString()
                    }));
                }
            }, 30000);
        };
        
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
        };
        
        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        websocket.onclose = () => {
            console.log('WebSocket disconnected');
            // Attempt to reconnect after 5 seconds
            reconnectInterval = setTimeout(() => {
                console.log('Attempting to reconnect WebSocket...');
                connectWebSocket();
            }, 5000);
        };
    } catch (error) {
        console.error('Failed to connect WebSocket:', error);
    }
}

function handleWebSocketMessage(data) {
    console.log('WebSocket message:', data);
    
    if (data.type === 'connection') {
        console.log('WebSocket connection confirmed:', data.message);
    } else if (data.type === 'todo_update') {
        // Reload todos when update received
        loadTodos();
    }
}

// Event Listeners
function setupEventListeners() {
    const form = document.getElementById('add-todo-form');
    form.addEventListener('submit', handleAddTodo);
}

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// API Helper
async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
        
        // Handle 401 Unauthorized
        if (response.status === 401) {
            // Try to refresh token
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // Retry the request with new token
                const newToken = localStorage.getItem('access_token');
                mergedOptions.headers.Authorization = `Bearer ${newToken}`;
                const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
                return await retryResponse.json();
            } else {
                // Refresh failed, logout
                logout();
                return null;
            }
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('access_token', data.access);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

// API Functions
async function loadTodos() {
    showLoading();
    try {
        const data = await apiCall('/todos/');
        
        if (data && data.success) {
            todos = data.todos;
            renderTodos();
            updateStats();
        } else {
            showError(data?.error || 'Failed to load todos');
        }
    } catch (error) {
        showError('Failed to connect to server. Make sure Django is running on port 8000.');
        console.error('Error loading todos:', error);
    } finally {
        hideLoading();
    }
}

async function handleAddTodo(e) {
    e.preventDefault();
    
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        const data = await apiCall('/todos/create/', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
        
        if (data && data.success) {
            input.value = '';
            showSuccess('Todo added successfully!');
            await loadTodos();
        } else {
            showError(data?.error || 'Failed to add todo');
        }
    } catch (error) {
        showError('Failed to add todo');
        console.error('Error adding todo:', error);
    }
}

async function toggleTodoStatus(todoId, isFinished) {
    const endpoint = isFinished ? 'unfinish' : 'finish';
    
    try {
        const data = await apiCall(`/todos/${todoId}/${endpoint}/`, {
            method: 'PUT'
        });
        
        if (data && data.success) {
            showSuccess(isFinished ? 'Todo marked as pending' : 'Todo completed!');
            await loadTodos();
        } else {
            showError(data?.error || 'Failed to update todo');
        }
    } catch (error) {
        showError('Failed to update todo');
        console.error('Error updating todo:', error);
    }
}

async function deleteTodo(todoId) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }
    
    try {
        const data = await apiCall(`/todos/${todoId}/delete/`, {
            method: 'DELETE'
        });
        
        if (data && data.success) {
            showSuccess('Todo deleted successfully!');
            await loadTodos();
        } else {
            showError(data?.error || 'Failed to delete todo');
        }
    } catch (error) {
        showError('Failed to delete todo');
        console.error('Error deleting todo:', error);
    }
}

// Rendering Functions
function renderTodos() {
    const container = document.getElementById('todos-container');
    const emptyState = document.getElementById('empty-state');
    
    if (todos.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Group todos by date
    const groupedTodos = groupTodosByDate(todos);
    
    // Render grouped todos
    container.innerHTML = Object.keys(groupedTodos)
        .sort((a, b) => new Date(b) - new Date(a))
        .map(date => renderDateGroup(date, groupedTodos[date]))
        .join('');
}

function groupTodosByDate(todos) {
    const groups = {};
    
    todos.forEach(todo => {
        const date = new Date(todo.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (!groups[date]) {
            groups[date] = [];
        }
        
        groups[date].push(todo);
    });
    
    return groups;
}

function renderDateGroup(date, todos) {
    const isToday = date === new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date === yesterday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let displayDate = date;
    if (isToday) displayDate = 'Today';
    else if (isYesterday) displayDate = 'Yesterday';
    
    return `
        <div class="date-group mb-8">
            <div class="flex items-center gap-4 mb-4">
                <h3 class="text-2xl font-bold">${displayDate}</h3>
                <div class="badge badge-neutral">${todos.length} ${todos.length === 1 ? 'todo' : 'todos'}</div>
            </div>
            <div class="space-y-3">
                ${todos.map(todo => renderTodoItem(todo)).join('')}
            </div>
        </div>
    `;
}

function renderTodoItem(todo) {
    const createdTime = formatTime(todo.created_at);
    const finishedTime = todo.finished_at ? formatTime(todo.finished_at) : null;
    
    return `
        <div class="card bg-base-100 shadow-md todo-item ${todo.is_finished ? 'finished-todo' : ''}">
            <div class="card-body p-4">
                <div class="flex items-start gap-3">
                    <!-- Checkbox -->
                    <input 
                        type="checkbox" 
                        class="checkbox checkbox-primary mt-1" 
                        ${todo.is_finished ? 'checked' : ''}
                        onchange="toggleTodoStatus(${todo.id}, ${todo.is_finished})"
                    />
                    
                    <!-- Content -->
                    <div class="flex-1">
                        <p class="text-lg ${todo.is_finished ? 'line-through text-base-content/60' : 'text-base-content'}">
                            ${escapeHtml(todo.text)}
                        </p>
                        
                        <!-- Timestamps -->
                        <div class="flex flex-wrap gap-3 mt-2 text-sm text-base-content/60">
                            <div class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Created: ${createdTime}</span>
                            </div>
                            
                            ${finishedTime ? `
                                <div class="flex items-center gap-1 text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Finished: ${finishedTime}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Delete Button -->
                    <button 
                        class="btn btn-ghost btn-sm btn-circle text-error"
                        onclick="deleteTodo(${todo.id})"
                        title="Delete todo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.is_finished).length;
    const pending = total - completed;
    
    document.getElementById('total-count').textContent = total;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('pending-count').textContent = pending;
}

// UI Feedback Functions
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showError(message) {
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = message;
    errorAlert.classList.remove('hidden');
    
    setTimeout(() => {
        errorAlert.classList.add('hidden');
    }, 5000);
}

function hideError() {
    document.getElementById('error-alert').classList.add('hidden');
}

function showSuccess(message) {
    const toast = document.getElementById('success-toast');
    const successMessage = document.getElementById('success-message');
    
    successMessage.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
