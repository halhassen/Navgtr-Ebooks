Tweets Every 30 Minutes!
==========

Requires [node](http://nodejs.org/) and [npm](http://npmjs.org/). You also need a Twitter App access token, consumer key, and associated secrets: https://dev.twitter.com/apps/new

This app is deployed on Heroku and runs online from there.

Use the Heroku Scheduler addon to set tweet frequencies for your account.

(You'll need to add all that info to tweets.js before running the program, otherwise Twitter won't play nice.)

> npm install node-restclient@0.0.1

> npm install twit@1.1.6

> npm install express@2.5.9

> heroku addons:create scheduler:standard

> node tweets.js
