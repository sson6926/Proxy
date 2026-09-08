FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build for production
# RUN npm run build

# Expose ports
EXPOSE 3000
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
