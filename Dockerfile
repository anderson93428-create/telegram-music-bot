FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
ffmpeg \
yt-dlp \
python3 \
python3-pip \
build-essential

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN npm install

COPY . .

CMD ["node", "index.js"]