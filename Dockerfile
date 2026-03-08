FROM node:20

WORKDIR /app

COPY package*.json ./

# instalar dependencias del sistema primero
RUN apt-get update && apt-get install -y ffmpeg python3 python3-pip

# instalar yt-dlp
RUN pip3 install yt-dlp

# ahora instalar dependencias node
RUN npm install

COPY . .

CMD ["node", "index.js"]