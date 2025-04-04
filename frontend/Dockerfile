# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
