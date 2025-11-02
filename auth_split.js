// API Configuration
const API_BASE_URL = "https://todo-backend-gokul.onrender.com/api";


// State
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
    document.getElementById('signup-form').addEventListener('submit', handleRegister);
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

// Animation Functions
function switchToSignup() {
    if (!isLoginMode) return;
    
    const loginContainer = document.getElementById('login-container');
    const leftWelcome = document.getElementById('left-welcome');
    const rightWelcome = document.getElementById('right-welcome');
    const signupContainer = document.getElementById('signup-container');
    
    // Fade out current views
    loginContainer.classList.add('fade-out');
    rightWelcome.classList.add('fade-out');
    
    setTimeout(() => {
        // Hide faded elements
        loginContainer.classList.add('hidden-animated');
        rightWelcome.classList.add('hidden-animated');
        loginContainer.classList.remove('fade-out');
        rightWelcome.classList.remove('fade-out');
        
        // Show and animate new views
        leftWelcome.classList.remove('hidden-animated');
        signupContainer.classList.remove('hidden-animated');
        leftWelcome.classList.add('slide-in-left');
        signupContainer.classList.add('slide-in-right');
        
        // Clean up animation classes
        setTimeout(() => {
            leftWelcome.classList.remove('slide-in-left');
            signupContainer.classList.remove('slide-in-right');
        }, 400);
    }, 400);
    
    isLoginMode = false;
}

function switchToLogin() {
    if (isLoginMode) return;
    
    const loginContainer = document.getElementById('login-container');
    const leftWelcome = document.getElementById('left-welcome');
    const rightWelcome = document.getElementById('right-welcome');
    const signupContainer = document.getElementById('signup-container');
    
    // Fade out current views
    leftWelcome.classList.add('fade-out');
    signupContainer.classList.add('fade-out');
    
    setTimeout(() => {
        // Hide faded elements
        leftWelcome.classList.add('hidden-animated');
        signupContainer.classList.add('hidden-animated');
        leftWelcome.classList.remove('fade-out');
        signupContainer.classList.remove('fade-out');
        
        // Show and animate new views
        loginContainer.classList.remove('hidden-animated');
        rightWelcome.classList.remove('hidden-animated');
        loginContainer.classList.add('slide-in-left');
        rightWelcome.classList.add('fade-in');
        
        // Clean up animation classes
        setTimeout(() => {
            loginContainer.classList.remove('slide-in-left');
            rightWelcome.classList.remove('fade-in');
        }, 400);
    }, 400);
    
    isLoginMode = true;
}

// Login Handler
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        showError('login', 'Please fill in all fields');
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
            // Store tokens and user info
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to app
            window.location.href = 'app.html';
        } else {
            showError('login', data.error || 'Login failed');
        }
    } catch (error) {
        showError('login', 'Failed to connect to server');
        console.error('Login error:', error);
    } finally {
        setLoading(false, 'login');
    }
}

// Register Handler
async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (!username || !password) {
        showError('signup', 'Username and password are required');
        return;
    }
    
    if (password.length < 6) {
        showError('signup', 'Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirm) {
        showError('signup', 'Passwords do not match');
        return;
    }
    
    setLoading(true, 'signup');
    
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
            // Store tokens and user info
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to app
            window.location.href = 'app.html';
        } else {
            showError('signup', data.error || 'Registration failed');
        }
    } catch (error) {
        showError('signup', 'Failed to connect to server');
        console.error('Register error:', error);
    } finally {
        setLoading(false, 'signup');
    }
}

// UI Helper Functions
function setLoading(loading, type) {
    const btn = document.getElementById(`${type}-btn`);
    const spinner = document.getElementById(`${type}-spinner`);
    const text = document.getElementById(`${type}-text`);
    
    if (loading) {
        btn.disabled = true;
        spinner.classList.remove('hidden');
        text.textContent = type === 'login' ? 'Signing in...' : 'Creating account...';
    } else {
        btn.disabled = false;
        spinner.classList.add('hidden');
        text.textContent = type === 'login' ? 'Sign In' : 'Sign Up';
    }
}

function showError(type, message) {
    const errorAlert = document.getElementById(`${type}-error`);
    const errorMessage = document.getElementById(`${type}-error-message`);
    
    errorMessage.textContent = message;
    errorAlert.classList.remove('hidden');
    
    setTimeout(() => {
        errorAlert.classList.add('hidden');
    }, 5000);
}
