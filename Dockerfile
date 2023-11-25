FROM node:16

ARG FRONT_URL
ARG DATABASE_URL
ARG JWT_SECRET
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_TLS
ARG SMTP_USER
ARG SMTP_PASSWORD
ARG MAIL_TO
ARG MAIL_BCC

ENV NODE_ENV=production
ENV FRONT_URL=$FRONT_URL
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_TLS=$SMTP_TLS
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASSWORD=$SMTP_PASSWORD
ENV MAIL_TO=$MAIL_TO
ENV MAIL_BCC=$MAIL_BCC

ENV home /usr/src/app

WORKDIR $home

COPY ./api/ $home
RUN npm install
RUN npm install -g typescript
RUN apt update && apt install jpegoptim
RUN tsc

EXPOSE 80
CMD [ "node", "./dist/app.js" ]