# Use Python slim image for serving static files
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy frontend files
COPY . /app/

# Copy the custom server
COPY server.py /app/

# Expose port
EXPOSE 8080

# Run the custom server
CMD ["python", "server.py"]
