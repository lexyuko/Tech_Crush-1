# syntax=docker/dockerfile:1


ARG NODE_VERSION=24.8.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR  /app

# Copy package.json so that package manager commands can be used.
COPY package*.json ./

#. install dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build

RUN ls -la  /app && ls -la /app/dist || echo "DIST FOLDER NOT FOUND"


#production
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json  ./

RUN npm install --only=production

COPY --from=base /app/dist ./dist


# Use production node environment by default.
ENV NODE_ENV=production




# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD ["npm", "start"]
