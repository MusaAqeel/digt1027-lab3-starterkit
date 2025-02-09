FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 5000
CMD ["pnpm", "start"]