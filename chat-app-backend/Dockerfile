FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
COPY requirements.txt /code
WORKDIR /code
RUN pip install -r requirements.txt
COPY backend /code
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--env", "DJANGO_SETTINGS_MODULE=backend.settings", "--reload", "backend.wsgi", "--reload"]
