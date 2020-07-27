FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y netcat
RUN mkdir /code
WORKDIR /code
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY backend .
COPY entrypoint.sh .
RUN ls -al
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi"]
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--env", "DJANGO_SETTINGS_MODULE=backend.settings", "--reload", "backend.wsgi"]
ENTRYPOINT ["./entrypoint.sh"]
