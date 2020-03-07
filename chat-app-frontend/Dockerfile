FROM node

RUN mkdir /code
COPY package.json yarn.lock /code/
WORKDIR /code
RUN yarn
COPY . .
RUN yarn build
