FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn

RUN yarn install

COPY . .

ENV PORT=4000
ENV GDRIVE_SA=''
ENV ROOT_FOLDER=''
ENV MONGO_URI=''
ENV ADMIN_APP_SECRET=''
ENV APP_SECRET=''
ENV EMAIL_USER=''
ENV EMAIL_PASS=''
ENV DOMAIN=''

EXPOSE 4000

CMD ["yarn", "start"]