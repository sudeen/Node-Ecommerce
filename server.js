var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds115434.mlab.com:15434/ecommerce', function (err) {
    if (err) {
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }

})

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/create-user', function(req, res, next){
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if(err) next(err);

        res.json('Successfully created new user');

    });
}); 

app.listen(9000, function (err) {
    if (err) throw err;
    console.log("Server is Running on port 9000");
});