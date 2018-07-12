FROM node:alpine as builder
RUN apk add --no-cache paxctl && paxctl -cm `which node`
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM node:alpine
RUN apk add --no-cache paxctl && paxctl -cm `which node`
WORKDIR /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
EXPOSE 3000
CMD node dist/main
