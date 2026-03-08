FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y python3 ffmpeg && ln -s /usr/bin/python3 /usr/bin/python

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]