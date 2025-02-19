FROM node:16.8.0-alpine as build
ENV NODE_OPTIONS=--max-old-space-size=2096
WORKDIR /app

COPY ["package.json", "./"]

RUN apk add --update tzdata && \
cp /usr/share/zoneinfo/America/Lima /etc/localtime && \
echo "America/Lima" >  /etc/timezone

RUN npm install 

COPY .  ./ 

EXPOSE 5004

ENTRYPOINT ["sh", "-c", "npm run start:debug"]
