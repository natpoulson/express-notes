# Express Notes
A note-taking app that leverages the capabilities of express.js

This app was made as part of the University of Sydney and edX Bootcamp, it hosts a simple web-based interface pre-supplied with routes pre-defined, to get, create, and delete notes from a data source.

The motivation for this project is to apply skills learned in regards to express.js to create an app that successfully handles GET, POST, and DELETE requests using modular routing. It also provided a unique challenge in figuring out how to create a test suite that works with this type of application.

Perhaps the hardest part of this was wrangling with the testing suite. There's a few areas that could have been done better (like directly testing the functions in the notes.js file), but it was difficult to conceptualise how it was all going to work, and in the end I admittedly monkey-wrenched both the code and the tests to make it come half way. It's given me some food for thought for my next project.

I would also like to implement a more asynchronous approach, but I feel like this might be better suited for SQL databases instead, since it's likely multiple async writes to a file will cause conflicts.

## Table of Contents


## Installation
To use this project, clone the git repository locally and run `npm install` to obtain the required modules.

Once installed, use `npm start` to launch the Express.js webserver. It will default to using `http://localhost:3001` if you do not have a configured PORT value in process.env.

From there, you can access the app by going to your browser and entering the above address.

You may alternately access an [online version](#) of this app here.

## Usage
To use the app, either after installing or going to the provided online:

- Click the "Get Started" link to 