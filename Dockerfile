FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install --force
COPY . ./
EXPOSE 3001
CMD [ "npm", "run", "dev"]
