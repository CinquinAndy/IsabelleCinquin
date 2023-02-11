FROM debian:bookworm-20230202 as builder-colors

WORKDIR /usr/app
COPY ./ ./

RUN apt update\
    && apt upgrade -y\
    && apt install curl git unzip apache2 systemctl wget sed -y

RUN sed -ri -e 's!/var/www/html!/usr/app!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!/usr/app!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf

RUN chmod -R 755 /usr/app
RUN chown -R www-data:www-data /usr/app

RUN a2enmod rewrite
RUN a2enmod headers

ENV PORT 80
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
