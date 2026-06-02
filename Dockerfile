# Development stage
FROM node:22-slim AS development

WORKDIR /app
ARG DATABASE_URL=postgresql://forum_user:forum_password@db:5432/forum_db?schema=public
ENV DATABASE_URL=$DATABASE_URL

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]

# Build stage
FROM node:22-slim AS builder

WORKDIR /app
ARG DATABASE_URL=postgresql://forum_user:forum_password@db:5432/forum_db?schema=public
ENV DATABASE_URL=$DATABASE_URL

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:22-slim

WORKDIR /app
ARG DATABASE_URL=postgresql://forum_user:forum_password@db:5432/forum_db?schema=public
ENV DATABASE_URL=$DATABASE_URL

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --omit=dev

# Generate Prisma Client
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
