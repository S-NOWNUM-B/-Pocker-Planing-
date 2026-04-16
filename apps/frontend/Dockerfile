# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root monorepo files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy frontend app
COPY apps/frontend ./apps/frontend

# Copy shared packages
COPY packages ./packages

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Build the frontend application
RUN cd apps/frontend && pnpm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY apps/frontend/nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
