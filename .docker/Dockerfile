FROM node:6

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

RUN npm install sass-loader node-sass --save-dev

CMD ["/entrypoint.sh"]