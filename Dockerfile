
FROM node:11.12.0

ENV NODE_VERSION 11.12.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000

CMD ["npm", "start"]