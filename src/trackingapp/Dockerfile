FROM node:14-alpine AS builder

WORKDIR /app

#COPY ["yarn.lock", "package.json", "./"]
COPY ["package.json", "package-lock.json", "./"]

RUN npm install
#RUN npm rebuild node-sass
#RUN npm rebuild node-sass --sass-binary-name=linux-x64-83
#RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV production
ENV CI true

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
