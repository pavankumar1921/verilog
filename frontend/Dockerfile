# ---------- BUILD STAGE ----------
FROM node:20-slim AS build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of frontend code
COPY . .

# Build production files
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# Remove default nginx default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
