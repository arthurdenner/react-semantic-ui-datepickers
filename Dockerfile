FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
COPY date-fns-v2/package.json yarn.lock /usr/src/date-fns-v2/
RUN yarn install
COPY . .
RUN yarn storybook:build
RUN mv ./storybook-static /public