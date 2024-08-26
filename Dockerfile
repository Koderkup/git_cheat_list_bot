# Use the latest version of Node.js
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the bot will run on
EXPOSE 3000

# Set the environment variable for the bot token
ENV BOT_API_KEY=$BOT_API_KEY

# Set the command to start the bot
CMD ["npm", "start"]