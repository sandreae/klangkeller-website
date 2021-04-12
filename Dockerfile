FROM node:15-alpine

# Create app directory
WORKDIR /usr/src/app

# Install git
RUN apk update
RUN apk add git

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

#Expose port and start application

EXPOSE 3000

CMD [ "npm", "start" ]
