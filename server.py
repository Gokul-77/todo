#!/usr/bin/env python3
"""
Simple HTTP Server for Todo List Frontend
Serves on localhost:8080 with proper routing
"""

import http.server
import socketserver
import os
import sys

# Configuration
PORT = 8080
HOST = "127.0.0.1"  # Use IPv4 localhost instead of IPv6

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler with proper routing and logging"""
    
    def end_headers(self):
        # Add CORS headers for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        # Cache control
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        """Handle GET requests with proper routing"""
        # Remove query parameters for routing
        path = self.path.split('?')[0]
        
        # Route handling
        if path == '/':
            # Serve landing page
            self.path = '/index.html'
        elif path == '/app' or path == '/app/':
            # Serve todo app
            self.path = '/app.html'
        elif path == '/auth' or path == '/auth/':
            # Serve auth page
            self.path = '/auth.html'
        elif path == '/favicon.ico':
            # Return 204 No Content for favicon (using inline SVG in HTML)
            self.send_response(204)
            self.end_headers()
            return
        
        # Serve the file
        return super().do_GET()
    
    def log_message(self, format, *args):
        """Custom logging format"""
        # Clean up the log message
        message = format % args
        # Only log important requests (skip favicon, etc.)
        if 'favicon' not in message.lower():
            sys.stdout.write(f"[{self.log_date_time_string()}] {message}\n")

def run_server():
    """Start the HTTP server"""
    # Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("🚀 Todo List Frontend Server")
        print("=" * 60)
        print(f"📍 Server running at: http://{HOST}:{PORT}/")
        print(f"📍 Also accessible at: http://localhost:{PORT}/")
        print()
        print("📄 Available routes:")
        print(f"   • Landing Page:  http://localhost:{PORT}/")
        print(f"   • Auth Page:     http://localhost:{PORT}/auth")
        print(f"   • Todo App:      http://localhost:{PORT}/app")
        print()
        print("⚙️  Backend should be running at: http://localhost:8000/")
        print()
        print("Press Ctrl+C to stop the server")
        print("=" * 60)
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped by user")
            print("=" * 60)

if __name__ == "__main__":
    run_server()
