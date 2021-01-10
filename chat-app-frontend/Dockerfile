FROM node:13.10.1 as build

WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


FROM nginx:1.17.9 as serve

COPY --from=build /code/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
