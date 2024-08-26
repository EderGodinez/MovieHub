FROM node:20.13.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/moviehub /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
