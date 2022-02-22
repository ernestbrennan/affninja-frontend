FROM gitlab.hhdev.net:4567/affninja/docker.images/app:latest
MAINTAINER itstokey <itstokey@gmail.com>

COPY ./docker/aff1/my.nginx.conf /etc/nginx/conf.d/my.nginx.conf
COPY ./docker/aff1/control.nginx.conf /etc/nginx/conf.d/control.nginx.conf
COPY ./docker/aff1/office.nginx.conf /etc/nginx/conf.d/office.nginx.conf
COPY ./docker/aff1/promo.nginx.conf /etc/nginx/conf.d/promo.nginx.conf
COPY ./docker/aff1/support.nginx.conf /etc/nginx/conf.d/support.nginx.conf

COPY . /var/www/cabinet.affninja

RUN rm -rf /var/www/cabinet.affninja/node_modules \
    && rm -rf /var/www/cabinet.affninja/.git \
    && rm -rf /var/www/cabinet.affninja/tests


RUN chown -R www-data:www-data /var/www/cabinet.affninja && chmod -R 775 /var/www/cabinet.affninja

WORKDIR /var/www/cabinet.affninja

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]