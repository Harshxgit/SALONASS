FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
COPY tsconfig.json ./


# Install dependencies
RUN npm ci


COPY server /usr/src/app/server
COPY prisma ./prisma
COPY src ./src



# Can you add a script to the global package.json that does this?
COPY . .

RUN npx prisma generate 


RUN npm run build

# Expose the port your application will run on
EXPOSE 3000
CMD ["npm", "run", "start"]