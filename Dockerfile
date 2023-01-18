FROM node:16-alpine

WORKDIR "/app"

COPY packge.json .
RUN npm install

COPY . .

CMD ["npm", "start"]