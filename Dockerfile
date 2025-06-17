FROM node:22-alpine AS frontend-build

WORKDIR /app

COPY ./frontend ./frontend

COPY backend/ ./backend/

COPY package*.json ./

RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]