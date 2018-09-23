require("../model/profile.js");
require("../model/cityData.js");

var Register = mongoose.model('profileModel');
var City = mongoose.model('cityData');

exports.registerUser = function (req, res) {
    console.log(req.body);
    var register = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    register.save(function (err, result) {
        if (err) {
            console.log("error occured");
            res.send({ status: false, message: "Registration failed", err });
        }
        else {
            register.save();
            console.log("User registered successfully");
            res.send({ status: true, message: "Successfully registered", result });

        }
    })
}


exports.loginUser = function (req, res) {
    Register.findOne({ email: req.body.email, password: req.body.password }, function (err, result) {
        console.log(result);
        if (err) {
            res.send({ status: false, message: "login failed", err });
        }
        else {
            if (result == null) {
                console.log(result);
                res.send({ status: false, message: "user does't exists" });
            } else {
                res.send({ status: true, message: "login successfully" });
            }

        }
    })

}

exports.getUserByEmail = function (req, res) {
    Register.findOne({ email: req.query.email },{name: 0},{}, function (err, result) {
        console.log(result);
        if (err) {
            res.send({ status: false, message: "User not found" });
        }
        else {
            if(result == null ){
                res.send({ status:false, message:"user doesn't exist", result});
            }else
            res.send({ status: true, message: "User found successfully", result });
        }
    })

}


exports.deleteUser = function (req, res) {
Register.remove({email: req.params.email}, function(err, result){
    if (err){
        res.send({ status: false, message: "user can not be deleted"});
    }else{
        res.send({ status:true, message: "user deleted successfully"});
    }
})
}

exports.updateUser = function(req, res){
    Register.findOne({email: req.body.email}, function(err, user){
        console.log(user);
        if(err){
            res.send({ status:false, message: "user not updated"});
        }
        else{
            user.name = req.body.name,
            user.password = req.body.password
            user.save(function(err, result){
              
                if(err){
                    res.send({ status:false, message: "error occurred", err});
                }
                else{
                    res.send({ status: true, message: "user updated successfully", result});
                }
            })
        }
    })
}

exports.updateUserByEmail = function(req, res){
    Register.findOneAndUpdate({email: req.body.email},{ $set: {name: req.body.name, password: req.body.password }}, 
    function(err, result){
        console.log((result));
        if(err){
            res.send({ status: false, message: "User is not updated"});
        }
        else{
            res.send({ status:true, message: "User updated"});
        }
    })
}

exports.changePassword = function(req, res){
    Register.findOneAndUpdate({email: req.body.email}, {$set: {name: req.body.name, password: req.body.password }},
    function(err, result){
        console.log(result);
        if(err){
            res.send({ status: false, message: "user is not updated"});
        }
        else{
            res.send({ status: true, message: "user has been updated successfully"});
        }
    })
}


exports.getAllUsers = function(req, res){
    Register.find({}, function(err, result){
        console.log(result);
        if(err){
            res.send({ status:false, message:"Userlist is not found", err});
        }
        else{
            res.send({ status: true, message:"Userlist is successfully displayed", result});
        }
    })
}

// exports.getAllEmails = function(req, res){
//     Register.find({}).populate('email').exec(function(err, result){
//         console.log(result);
//         if(err){
//             res.send({status:false, message:"error"});
//         }
//         else{
//             res.send({status:true, message:"success", result});
//         }
//     })
// }

exports.getAllEmails = function(req, res){
    Register.find({}, { email:1, name:0 }, function(err, result){
        //only with _id we can use 0 and 1 for inclusion , not for other fields
        // e.g. _id:0, email:1 --- will work
        // e.g. email:1, name:0 --- will not work
        //"errmsg": "Projection cannot have a mix of inclusion and exclusion.",
        console.log(result);
        if(err){
            res.send({ status: false, message: "Error", err});
        }
        else{
            res.send({ status:true, message:"Success", result});
        }
    })
}


exports.getCityDetails = function(req, res){
    City.find({}, {}, {limit: 10},function(err, result){
        console.log(result);
        if(err){
            res.send({ status: false, message: "Error", err});
        }
        else{
            res.send({ status:true, message:"Success", result});
        }
    })
}

