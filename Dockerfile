FROM node:16
WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build