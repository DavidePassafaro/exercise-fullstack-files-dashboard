# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS builder

WORKDIR /webapp

# Install dependencies
COPY webapp/package*.json ./
RUN npm install

# Copy all the content of the webapp folder into the current folder (/app)
COPY webapp/ .

# Build the Angular app
RUN npm run build

# Production image
FROM nginx:alpine AS runner

# Remove default Nginx static files to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config
COPY webapp/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder
COPY --from=builder /webapp/dist/fd-dashboard/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]