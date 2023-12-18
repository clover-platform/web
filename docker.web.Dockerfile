FROM nginx:latest
COPY ./packages/web/i18n/ /var/app/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
