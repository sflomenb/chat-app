#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z "${DATABASE_HOST}" "${DATABASE_PORT}"; do
    sleep 0.1
done

echo "PostgreSQL started"

python manage.py collectstatic --noinput

exec "$@"
