# Setup node container
FROM node:14-alpine as node

# Set workdir and copy files
WORKDIR /app
COPY . .

# Build the angular application
RUN npm install
RUN npm run build

# Setup the NGINX container
FROM nginx:alpine
COPY --from=node /app/dist/worqplace.=-FrontEnd /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
