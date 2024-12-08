# Stage dependencies 
FROM node:21-alpine AS base
WORKDIR /usr/src/app
COPY package*.json .
# RUN npm config set registry http://registry.npmjs.org/ 
RUN npm install --frozen-lockfile

FROM node:21-alpine AS build 
WORKDIR /usr/src/app
COPY . .
COPY --from=base /usr/src/app/node_modules ./node_modules
RUN npm run build 

FROM node:21-alpine AS final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/views ./views
COPY --from=build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]