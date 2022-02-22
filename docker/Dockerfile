FROM gitlab.hhdev.net:4567/affninja/docker.images/app:latest
MAINTAINER itstokey <itstokey@gmail.com>

COPY ./docker/my.nginx.conf /etc/nginx/conf.d/my.nginx.conf
COPY ./docker/control.nginx.conf /etc/nginx/conf.d/control.nginx.conf
COPY ./docker/office.nginx.conf /etc/nginx/conf.d/office.nginx.conf
COPY ./docker/promo.nginx.conf /etc/nginx/conf.d/promo.nginx.conf
COPY ./docker/support.nginx.conf /etc/nginx/conf.d/support.nginx.conf

COPY . /var/www/cabinet.affninja

RUN rm -rf /var/www/cabinet.affninja/node_modules \
    && rm -rf /var/www/cabinet.affninja/.git \
    && rm -rf /var/www/cabinet.affninja/tests


RUN chown -R www-data:www-data /var/www/cabinet.affninja && chmod -R 775 /var/www/cabinet.affninja

WORKDIR /var/www/cabinet.affninja

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]