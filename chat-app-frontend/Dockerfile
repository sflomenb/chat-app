FROM node:13.10.1

RUN mkdir /code
COPY package.json yarn.lock /code/
WORKDIR /code
RUN yarn
COPY . .
