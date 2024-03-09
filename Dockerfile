# # Use an official Node runtime as the base image
# FROM node:14-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire project to the working directory
# COPY . .

# # Build the React app
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 80

# # Define the command to run the app
# CMD ["npm", "start"]

# Base Image
FROM node:18 as builder

# Set Working Directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

ENV REACT_APP_API_URL=https://13.201.167.118:8080

# Build the app
RUN npm run build

# Stage 2
# Base Image
FROM nginx

# Remove default nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
