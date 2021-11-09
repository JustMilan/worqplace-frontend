# Setup node container
FROM node:14 as node

# Set workdir and copy files
WORKDIR /app
COPY . .

# Build the angular application
RUN npm install
RUN npm run build --prod

# Setup the NGINX container
FROM nginx:alpine
COPY --from=node /app/dist/worqplace.=-FrontEnd /usr/share/nginx/html
