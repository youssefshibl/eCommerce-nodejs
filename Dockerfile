# Use an official Node.js runtime as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Express app is listening
EXPOSE 3000

# Start the Express app
CMD ["npm", "start"]