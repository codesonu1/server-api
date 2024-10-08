FROM node:19.2.0
WORKDIR /app
COPY package*.json ./
RUN npm  install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]