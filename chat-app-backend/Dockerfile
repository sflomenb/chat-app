FROM python:3.8 AS build

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y --no-install-recommends netcat
WORKDIR /code
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt --prefix /deps --no-warn-script-location
COPY backend entrypoint.sh ./

FROM python:3.8-slim-buster
WORKDIR /code
COPY --from=build /code /code
COPY --from=build /deps /usr/local
ENTRYPOINT ["./entrypoint.sh"]
