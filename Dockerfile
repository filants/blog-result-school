# FROM image version
FROM node:18

# WORKDIR working location
WORKDIR /usr/src/app

# COPY source destination
COPY . . 

# CD to folders and RUN install of dependencies
WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

# EXPOSE server port number
EXPOSE 3001

# CMD application run command
CMD [ "node", "app.js" ]