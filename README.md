# user_authentication-Passportjs Local Statagy
This is small Project with user Authentication .with Passport js Statagy 
 
 Steps :
  1. Install passport and passport local 
  
  2.configure The Passport Local 
     
  3.  write The serialize and Deserialize function 
  
  4.Use some Middleware To Init The Passport 
  
  5.authenticate The passport in Route controller
  
  

//Passport Configuration for Local Statagy :

const LocalStatagy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Req User Model;
const User = require('./models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStatagy({usernameField : 'email'}, (email, password,done)=>{
               
            //Match User :
            User.findOne({email : email})
              .then((user)=>{
                   if(!user){
                       console.log('Email Not Found !');
                       return done(null, false, {message : 'User Not Found !'})
                   }

                   //match The Password
                   bcrypt.compare(password,user.password, (err, match)=>{
                        if(err) throw err;
                        if(match){ 
                            return done(null, user);
                        }
                        else{
                            console.log('password not Match!')
                            return done(null, false, {message:'Password dose Not Matched! '})
                        }
                   });
              })
              .catch((err)=>{
                 console.log(err)
              })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}
