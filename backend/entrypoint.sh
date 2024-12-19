# entrypoint.sh
#!/bin/bash

# Wait for postgres
echo "Waiting for postgres..."
while ! pg_isready -h db -U propertyuser -d propertydb; do
  sleep 1
done
echo "PostgreSQL started"

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Start server
echo "Starting server..."
exec python manage.py runserver 0.0.0.0:8000