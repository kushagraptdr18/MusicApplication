const bcrypt= require('bcrypt');
 const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel')



module.exports.isLoggedIn = async function(req,res,next){
  
     if(req.cookies.token){
        try{
        let decoded = jwt.verify(req.cookies.token, 'shhh');
        let user = await userModel.findOne({email:decoded.email})
        if(user){
        req.user = user;
        next();
        }
        else{
            return res.redirect("/");
        }
        
        }
        catch(err){
            return res.redirect("/");

        }
    }

    else{
        return res.redirect("/");
    }
}