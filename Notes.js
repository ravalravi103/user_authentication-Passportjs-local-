/*
===============================
  Passport Js 
===============================

      To Implemen Local statagy we Need Two Packages;
      1.passport
      2.passport Local

      We Create new Flie called as PassportConfig and 
      will Configure The Local stratagy


          const LocalStratgy = require('passport-local').stratgy;
          const User = require('./model/users');
          const mongoose = require('mongoose')
          const bcrypt = require('brcrpt');

          module.exports = function(passport){
                passport.use(
                    new LocalStratgy({userNameField : 'email',}, ('email,password,done')=>{
                       
                       
                        // Retirve The User From database :
                           User.findOne({email: email})
                              .then(user => {
                                     
                                   // Match The Password :
                                   bcrypr.compare(password, user.password, (err, match)=>{
                                         if(!macth){
                                             return done(null, users,{message :"Password Not Found"})
                                         }

                                         return done(null, user);
                                   })
                              })
                              .catch(err => {
                                   return done(null, false,{messages : "Usres dose Not Exits"})
                              })


                    })
                )


                Here add The option for serialize and Deserialize 
          }

 */

/*
add some middleware for Passport and Session Inti after The session Variable Declaration

*/
