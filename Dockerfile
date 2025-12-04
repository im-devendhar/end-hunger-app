# Dockerfile (place at repo root)

# Stage 1: build the React app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG PUBLIC_URL=/
ENV PUBLIC_URL=${PUBLIC_URL}
RUN npm run build

# Stage 2: nginx to serve static files
FROM nginx:stable-alpine AS runtime
# clear default nginx html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
# optional: copy a custom nginx config if you want
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
