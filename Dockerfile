# Multi-stage Dockerfile for complete full-stack app

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Production
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package.json ./backend/

# Copy frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Install serve to serve frontend
RUN npm install -g concurrently serve

# Expose ports
EXPOSE 5000 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Start both services
CMD ["sh", "-c", "cd backend && node dist/server.js & serve -s frontend/dist -l 3000"]

