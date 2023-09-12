# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn install --ignore-engines
COPY . ./

# set env
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}


RUN echo 'REACT_APP_API_URL = '$REACT_APP_BASEURL > .env.production

# run build
RUN yarn build


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]