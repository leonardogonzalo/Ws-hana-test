FROM node:alpine

ENV API_PORT 9300

RUN apk update && \
    apk upgrade && \
    apk add ca-certificates && \
    apk add --update bash

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

EXPOSE 9300

CMD [ "npm", "start" ]

