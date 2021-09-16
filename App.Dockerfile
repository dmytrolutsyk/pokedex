FROM node:15.9.0-alpine as base
WORKDIR /app
COPY ./package*.json ./
# COPY ./yarn.lock ./
RUN yarn install
COPY . ./