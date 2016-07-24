/*
 * Copyright (c) 2016 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@2.1.3
 * Documentation: http://mongodb.github.io/node-mongodb-native/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
*/

// server.js
// where your node app starts

// init project
var express = require('express');
var mongodb = require('mongodb');
var sequelize = require('sequelize');
var app = express();
var u="hello";

app.use(express.static('public'));

// Create seed data
var seedData = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  }
];

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;

var sql = new sequelize('postgres://rxwhfdjpsornis:wEj_ff25zV-pr0DVfC0s54llXh@ec2-54-235-254-56.compute-1.amazonaws.com:5432/dakl7381ku12bh');

var User = sql.define('user', {
  firstName: {
    type: sequelize.STRING
  },
  lastName: {
    type: sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

app.get("/", function (request, response) {
  User.findOne().then(function(users) {
    u += users.get('firstName');
  });
  response.send(u);
});

// listen for requests :)
listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});