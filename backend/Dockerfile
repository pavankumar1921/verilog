# Use official Node.js image
FROM node:20-slim

# Install system dependencies (Verilog tools)
RUN apt-get update && apt-get install -y \
    yosys \
    iverilog \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

# Create app directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy rest of backend code
COPY . .

# Expose backend port (change if needed)
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
