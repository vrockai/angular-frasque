angular-frasque [![Build Status](https://travis-ci.org/vrockai/angular-frasque.svg?branch=master)](https://travis-ci.org/vrockai/angular-frasque)
===============

Angular-frasque is a general FAQ site. The FAQ data are stored in json format in the [app/data/faqData.json](https://github.com/vrockai/angular-frasque/blob/master/app/data/faqData.json) file. Feel free to fork the project, apply your own styles in the [app/styles/](https://github.com/vrockai/angular-frasque/tree/master/app/styles) directory, put your own json FAQ file and deploy.

## Prerequisites

If you don't already have `npm`, get it by installing [Node.js](http://nodejs.org/). To install [Bower](http://bower.io/) globally on your machine execute:

`npm install -g bower`

To install all npm dependencies, execute this command inside the project directory:

`npm install`

## Build

Angular-frasque is using [Gulp](http://gulpjs.com/) for build automation. Once you installed all prerequisites you can build the project by executing:

`gulp`

It creates a new directory called `dist`.

## Run locally

It's possible to run the project locally, getting an advantage of the [Node.js](http://nodejs.org/) web server provided by the [browser-sync](http://www.browsersync.io/) package. To start the server, execute:

`gulp serve`

The serve task will open new browser window with angular-frasque. At this point it's possible to make changes in the code. After the change is registered by the watch task (the source file is saved), the browser is refreshed in the background, taking those changes into account.

## Deploy

To deploy the angular-frasque on your own web server, just copy the contents of the dist directory to your web-server deploy directory, i.e.:

`cp -r dist/* /var/www/html/faq/`
