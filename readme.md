# Docker Lab Commands - Musa Aqeel

## Create Docker Network
docker network create todo-network
docker network ls


## Run PostgreSQL Container
docker run -d \
  --name todo-db \
  --network todo-network \
  -p 5432:5432 \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:13


## Backend Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 5000
CMD ["pnpm", "start"]

## Build Backend Image
docker build -t todo-backend .

### Run Backend Container
docker run -d \
  --name todo-backend \
  --network todo-network \
  -p 5001:5000 \
  -e DB_USER=$DB_USER \
  -e DB_PASSWORD=$DB_PASSWORD \
  -e DB_NAME=$DB_NAME \
  -e DB_HOST=todo-db \
  todo-backend


## Complete Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["npx", "serve", "build", "-l", "3000"]

## Build Frontend Image
docker build -t todo-frontend .

## Run Frontend Container
docker run -d \
  --name todo-frontend \
  --network todo-network \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://todo-backend:5000 \
  todo-frontend


  Run Docker Compose
  docker compose up --build