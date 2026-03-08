FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
ffmpeg \
python3 \
python3-pip \
build-essential \
curl

# instalar la version mas reciente de yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN npm install

COPY . .

CMD ["node", "index.js"]