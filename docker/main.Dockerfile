FROM nginx:1.25.4-alpine
COPY ../packages/web-main/i18n /var/app/
COPY ../nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
