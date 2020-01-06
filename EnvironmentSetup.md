## Server side

npm i express mongoose body-parser bcryptjs validation config express-validator cors

bcryptjs is a password hashing function designed by Niels Provos and David Mazières
body-parser allows us to get the data throughout the request
express is our web server
mongoose is used to connect/interact with MongoDB
validation (as its name implies) is used for validation

cors solve below error
Access to XMLHttpRequest at 'http://localhost:8082/api/inventorytypes' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requeste resource

start server: npm run app

## Development only

npm i -D nodemon

## Client side

npx create-react-app client react-bootstrap bootstrap
npm install --save react-router-dom axios
react-bootstrap bootstrap

## Document References

https://blog.logrocket.com/mern-stack-a-to-z-part-1/
https://blog.logrocket.com/mern-stack-a-to-z-part-2/

## Code Snippet

import React, { Component } from 'react';

class ClassName extends Component {}

export default ClassName;
