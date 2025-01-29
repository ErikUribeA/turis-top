# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client after schema is present
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Define command to start the application in development mode
CMD ["npm", "run", "dev"]
