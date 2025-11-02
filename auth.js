// API Configuration
const API_BASE_URL = "https://todo-backend-gokul.onrender.com/api";

let isLoginMode = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
        window.location.href = 'app.html';
        return;
    }
    
    loadTheme();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('toggle-auth').addEventListener('click', toggleAuthMode);
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

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const title = document.getElementById('auth-title');
    const toggleText = document.getElementById('toggle-text');
    
    if (isLoginMode) {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        title.textContent = 'Login';
        toggleText.textContent = "Don't have an account? Register";
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        title.textContent = 'Register';
        toggleText.textContent = 'Already have an account? Login';
    }
    
    hideError();
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    setLoading(true, 'login');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store tokens
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to main app
            window.location.href = 'index.html';
        } else {
            showError(data.error || 'Login failed');
        }
    } catch (error) {
        showError('Failed to connect to server');
        console.error('Login error:', error);
    } finally {
        setLoading(false, 'login');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (!username || !password) {
        showError('Username and password are required');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirm) {
        showError('Passwords do not match');
        return;
    }
    
    setLoading(true, 'register');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store tokens
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to main app
            window.location.href = 'index.html';
        } else {
            showError(data.error || 'Registration failed');
        }
    } catch (error) {
        showError('Failed to connect to server');
        console.error('Register error:', error);
    } finally {
        setLoading(false, 'register');
    }
}

function setLoading(loading, type) {
    const btn = document.getElementById(`${type}-btn`);
    const spinner = document.getElementById(`${type}-spinner`);
    const text = document.getElementById(`${type}-text`);
    
    if (loading) {
        btn.disabled = true;
        spinner.classList.remove('hidden');
        text.textContent = type === 'login' ? 'Logging in...' : 'Registering...';
    } else {
        btn.disabled = false;
        spinner.classList.add('hidden');
        text.textContent = type === 'login' ? 'Login' : 'Register';
    }
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
