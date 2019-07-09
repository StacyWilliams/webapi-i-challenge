// implement your API here

// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
// use require() to import the express module and make it available to our application.
// const express = require('express'); is equivalent to import express from 'express'; if we were using ES2015 syntax.
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"

server.get('/', (req,res) => {
// express will pass the request and response objects to this function
// the .send() on the response object can be used to send a response to the client
    res.send('Hello World!')
});





// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts

server.listen(8000, () => console.log('API running on port 8000'));