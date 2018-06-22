FROM ruby:2.3

COPY requirements.txt ./
RUN apt-get update && apt-get install -y python3 python3-pip build-essential
RUN pip3 install -r requirements.txt
RUN gem install --no-ri --no-rdoc fpm

# I stole this from the linodemanager-builder to get yarn installed
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get update \
    && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
    && apt-get install -y yarn
# end stole config

COPY openapi-linter.py .
COPY openapi.yaml .
COPY build-docs.sh .
COPY linode-docs.postinst .
COPY linode-logo.svg .
COPY linode-logo-white.svg .
COPY redoc.standalone.js .
COPY favicon.ico .
COPY changelog/ .

CMD ["python", "openapi-linter.py", "openapi.yaml"]
