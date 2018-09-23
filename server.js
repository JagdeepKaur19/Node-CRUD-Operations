const express = require("express");
const bodyParser = require("body-parser");
app = express();
mongoose = require("mongoose");
var consts = require("./config/consts.js");
var db = require("./config/db.js");

app.use(bodyParser.urlencoded({ limit: '50mb', extended:true, parameterLimit: '1000000'}));
app.use(bodyParser.json({ limit: '50mb', parameterLimit: '1000000'}));

var register = require("./server/routes/profile");



//app.post('/login', register.loginUser);
app.post('/register',register.registerUser );
app.post('/login', register.loginUser );
app.get('/userByEmail', register.getUserByEmail );
app.delete('/deleteUser/:email', register.deleteUser );
app.put('/updateUser', register.updateUser  );
app.put('/updateUserByEmail', register.updateUserByEmail );
app.put('/changePassword', register.changePassword );
app.get('/getAllUsers', register.getAllUsers );
app.get('/getAllEmails', register.getAllEmails );
app.get('/getCityDetails', register.getCityDetails );

app.listen(consts.port_Number, function(){
    console.log("Server is running at port Number:", +consts.port_Number);

})
