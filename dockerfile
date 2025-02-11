FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json package-lock.json ./
COPY tsconfig.json ./


# Install dependencies
RUN npm install



COPY src ./src 
COPY prisma ./prisma 
COPY server /usr/src/app/server



# Can you add a script to the global package.json that does this?
RUN  npx prisma generate


COPY . .

RUN npm run build 

# Expose the port your application will run on
EXPOSE 3000
CMD ["npm", "run" ,"start"]