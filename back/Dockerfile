FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn

RUN yarn install

COPY . .

ENV PORT=4000
ENV GDRIVE_SA='mahafolio-70438c7fb3a.json'
ENV ROOT_FOLDER='1UdBGAfWFeBRegQHYOUShTR-Zvm2SWubB'
ENV MONGO_URI=mongodb+srv://mahaadminfolio:kertasfolio1@mahafolio.bavkqgu.mongodb.net/?retryWrites=true&w=majority
ENV ADMIN_APP_SECRET=$nowadmin1
ENV APP_SECRET=yukinoshitaYUKIN0
ENV FRONTEND_ORIGIN='http://localhost:3000'

EXPOSE 4000

CMD ["yarn", "start"]