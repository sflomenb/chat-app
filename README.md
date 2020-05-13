# Chat App (In-Progress)

## What is it

A chat app to get experience with Vue.js, Django, Docker, and eventually, Kubernetes.

## Perquisites

Docker and Docker compose

## Run app

    docker compose up -d

## Run the tests

Backend:

    docker-compose exec backend python manage.py test

Frontend:

    docker-compose exec frontend yarn test:unit

Todo:

- [ ] Display chat log and chat messages
- [ ] Use [Vuex](https://vuex.vuejs.org/guide/) to hold logged-in state
- [ ] Display nav bar with logged-in indicator
