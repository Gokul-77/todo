# Deployment Guide

This guide will help you deploy the Todo List application to production.

## Prerequisites

- Python 3.8+
- PostgreSQL 12+
- A web server (Nginx/Apache)
- A domain name (optional)

## Step 1: Prepare PostgreSQL Database

### Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/)

### Create Database and User

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE todo_db;

# Create user
CREATE USER todo_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;

# Exit
\q
```

## Step 2: Update Django Settings

### Install PostgreSQL adapter

```bash
pip install psycopg2-binary
```

Update `requirements.txt`:
```
Django==4.2.7
django-cors-headers==4.3.1
psycopg2-binary==2.9.9
gunicorn==21.2.0
```

### Update settings.py

Replace the DATABASES configuration:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'todo_db'),
        'USER': os.environ.get('DB_USER', 'todo_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'your_password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

### Security Settings

```python
# Production settings
DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY', 'change-this-in-production')
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com', 'your-ip-address']

# CORS settings
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
]

# CSRF settings
CSRF_TRUSTED_ORIGINS = [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
]

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
```

## Step 3: Setup Environment Variables

Create a `.env` file (never commit this!):

```bash
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

DB_ENGINE=django.db.backends.postgresql
DB_NAME=todo_db
DB_USER=todo_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Install python-decouple to use .env:
```bash
pip install python-decouple
```

Update settings.py:
```python
from decouple import config

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
```

## Step 4: Run Migrations

```bash
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
```

## Step 5: Setup Gunicorn

Create `gunicorn_config.py`:

```python
bind = "0.0.0.0:8000"
workers = 3
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
errorlog = "-"
accesslog = "-"
loglevel = "info"
```

Test Gunicorn:
```bash
gunicorn todoproject.wsgi:application -c gunicorn_config.py
```

## Step 6: Setup Systemd Service (Linux)

Create `/etc/systemd/system/todo.service`:

```ini
[Unit]
Description=Todo List Django Application
After=network.target

[Service]
User=your-username
Group=www-data
WorkingDirectory=/path/to/TODO
Environment="PATH=/path/to/TODO/venv/bin"
ExecStart=/path/to/TODO/venv/bin/gunicorn todoproject.wsgi:application -c gunicorn_config.py

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable todo
sudo systemctl start todo
sudo systemctl status todo
```

## Step 7: Setup Nginx

Create `/etc/nginx/sites-available/todo`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /path/to/TODO/staticfiles/;
    }

    location / {
        root /path/to/TODO/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/todo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 9: Update Frontend API URL

Edit `frontend/script.js`:

```javascript
// Change from:
const API_BASE_URL = 'http://localhost:8000/api';

// To:
const API_BASE_URL = 'https://yourdomain.com/api';
```

## Step 10: Backup Strategy

### Database Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/path/to/backups"
DB_NAME="todo_db"
DB_USER="todo_user"

pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/todo_backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "todo_backup_*.sql" -mtime +7 -delete
```

Add to crontab:
```bash
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

## Monitoring

### Check Application Logs

```bash
# Systemd logs
sudo journalctl -u todo -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Check Endpoint

Add to `todos/views.py`:

```python
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})
```

Add to `todos/urls.py`:
```python
path('health/', views.health_check, name='health_check'),
```

## Performance Optimization

### Enable Gzip Compression (Nginx)

Add to nginx config:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Database Connection Pooling

Install:
```bash
pip install django-db-connection-pool
```

Update settings.py:
```python
DATABASES = {
    'default': {
        'ENGINE': 'dj_db_conn_pool.backends.postgresql',
        # ... other settings
        'POOL_OPTIONS': {
            'POOL_SIZE': 10,
            'MAX_OVERFLOW': 10,
        }
    }
}
```

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U todo_user -d todo_db -h localhost
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R your-username:www-data /path/to/TODO
sudo chmod -R 755 /path/to/TODO
```

### Static Files Not Loading
```bash
python manage.py collectstatic --clear
sudo systemctl restart todo
```

## Rollback Procedure

If something goes wrong:

1. Stop the service:
```bash
sudo systemctl stop todo
```

2. Restore database:
```bash
psql -U todo_user -d todo_db < /path/to/backup.sql
```

3. Revert code changes (if using git):
```bash
git checkout previous-stable-version
```

4. Restart:
```bash
sudo systemctl start todo
```

## Security Checklist

- [ ] Change SECRET_KEY to a secure random string
- [ ] Set DEBUG = False
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Setup SSL/HTTPS
- [ ] Use strong database passwords
- [ ] Keep dependencies updated
- [ ] Setup firewall (ufw/iptables)
- [ ] Regular backups
- [ ] Monitor logs for suspicious activity
- [ ] Implement rate limiting (django-ratelimit)

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx/HAProxy)
- Multiple Gunicorn instances
- Shared PostgreSQL database

### Caching
- Install Redis
- Configure Django cache framework
- Cache frequently accessed data

### CDN
- Serve static files via CDN
- Reduce server load
- Improve global performance

---

For questions or issues, refer to Django documentation or create an issue in the repository.
