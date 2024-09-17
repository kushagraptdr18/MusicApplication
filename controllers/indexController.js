const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });





module.exports.landingPageController=function(req,res){
    res.render('index');
}

module.exports.RegisterPageController=function(req,res){
    res.render('userRegister');
}

module.exports.profilePageController = async function(req,res){
    let user = req.user;

    res.render('profile',{user})
}


module.exports.postRegisterContoller = async function (req,res){
   
    try {
        let { name, email, password, phoneNumber } = req.body;

        let user = await userModel.findOne({ email });
        if (user) return res.send('already registered');

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            name,
            email,
            phoneNumber,
            password: hash,
            profilePhoto: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              },
        })

        console.log(createdUser);
        

        let token = jwt.sign({ email, id: createdUser._id },'shhh' );

        res.cookie('token', token);
        res.redirect("/profile");
    }


    catch (error) {
        res.send(error.message);
    }





}

module.exports.postLoginPageController = async function(req,res){
    try {

        console.log(req.body);
        
        const {email,password } = req.body;

        const user = await userModel.findOne({ email });
       
        console.log(user);
        

        if (!user) {
            return res.redirect('/register');
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.send("Error during password comparison");
            }

            if (result) {
                let token = jwt.sign(
                    { email, id: user._id },
                    'shhh',
                );

                res.cookie('token', token)
                return res.redirect('/profile');

            } 
            
            else {
                return res.send("Incorrect password");
            }

        });
    } 
    
    catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports.logout=function(req,res){
    res.cookie('token','');
    res.redirect('/');
}
