FROM debian:latest

RUN apt-get update
RUN apt-get -y install rubygems ruby-dev build-essential libssl-dev 

RUN gem install bundler

RUN mkdir /app

ADD Gemfile /app/Gemfile
RUN cd /app && bundle install --without development test

ADD app /app/app
ADD api /app/api
ADD config /app/config
ADD Rakefile /app/Rakefile
ADD config.ru /app/config.ru

WORKDIR /app

EXPOSE 9292

CMD ["rackup", "--host", "0.0.0.0"]

