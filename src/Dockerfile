# Etapa 1: build com Node
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: produção com Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Substitui o default do nginx com sua config customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
