FROM node:21.1

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Use pnpm to install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

COPY . .

# Use pnpm to run the build script
RUN pnpm run build

EXPOSE 3000

# Use pnpm to start the application
CMD ["pnpm", "start"]

