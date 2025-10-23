# Complete Full-Stack Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/
COPY backend/src ./backend/src

# Copy frontend
COPY frontend/package*.json ./frontend/
COPY frontend/tsconfig.json ./frontend/
COPY frontend/tsconfig.node.json ./frontend/
COPY frontend/vite.config.ts ./frontend/
COPY frontend/tailwind.config.js ./frontend/
COPY frontend/postcss.config.js ./frontend/
COPY frontend/index.html ./frontend/
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public

# Install and build backend
WORKDIR /app/backend
RUN npm install
RUN npm run build

# Install and build frontend
WORKDIR /app/frontend
RUN npm install
ENV VITE_API_URL=/api
RUN npm run build

# Setup final workspace
WORKDIR /app

# Create startup script
RUN echo '#!/bin/sh' > start.sh && \
    echo 'cd /app/backend && node dist/server.js' >> start.sh && \
    chmod +x start.sh

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Start backend (which will serve frontend too)
CMD ["./start.sh"]
