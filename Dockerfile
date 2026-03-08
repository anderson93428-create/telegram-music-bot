FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y ffmpeg python3 python3-pip

RUN pip3 install yt-dlp

COPY . .

CMD ["node", "index.js"]