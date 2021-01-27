FROM node:14.4.0-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.19.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
