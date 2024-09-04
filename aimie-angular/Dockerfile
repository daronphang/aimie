ARG WORKINGPATH=/app
ARG ENTRYPATH=/app
ARG PORT=80
ARG CONFIG=production
ARG BASEHREF=/
ARG DEPLOYMENT_IMAGE=nginx:1.25.4-alpine 

# Stage: BUILD
# Install dependencies first to maximize Docker layer caching.
FROM node:22 AS build
ARG WORKINGPATH
ARG CONFIG
ARG BASEHREF
WORKDIR ${WORKINGPATH}

# Install packages.
COPY package.json package-lock.json kendo-ui-license.txt ./
# Dev is chosen over Prod as build requires dev config for angular dependencies.
RUN npm ci && npm cache clean --force && \
    npx kendo-ui-license activate && \
    npm link @angular/cli

# Build from source code.
COPY . .
RUN ng build --configuration=$CONFIG --base-href=$BASEHREF

# Stage: DEPLOY
FROM $DEPLOYMENT_IMAGE
ARG ENTRYPATH
ARG PORT
WORKDIR ${ENTRYPATH}

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build ${ENTRYPATH}/dist/aimie/browser /usr/share/nginx/html/aimie
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]