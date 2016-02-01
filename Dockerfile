FROM node
# replace this with your application's default port
EXPOSE 8000

ADD src /api

RUN cd /api; npm install

CMD ["node", "/api/index.js"]
