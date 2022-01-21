FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]


FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

FROM nginx:1.21.0-alpine as production
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# Stage
# docker-compose -f docker-compose.dev.yml up



# Production

# docker-compose -f docker-compose.prod.yml build

# docker login luischdu/frontendbookingdh
# docker tag c5d2edbbb645 luischdu/frontendbookingdh:1.2
# docker push luischdu/frontendbookingdh:1.2