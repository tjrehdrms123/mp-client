FROM node:16.3.0-alpine
MAINTAINER donggeun seogdonggeun@gmail.com

RUN mkdir /client
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json /client/package.json

RUN npm install --no-cache

COPY . /client/
CMD ["npm", "run", "build"]