FROM node:16-buster-slim as react-build
WORKDIR app

RUN apt-get update && apt-get -y install git

COPY ./package.json /app/package.json
RUN npm install
COPY . /app


RUN  npm run buildProd
EXPOSE 3000

CMD npm run prod
