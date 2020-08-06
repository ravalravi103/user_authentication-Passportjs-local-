const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const {ensureAuthenticated} = require('./auth')



//User Model 
const User = require('./models/User');

require('./passport')(passport);


app.set('view-engine','ejs');
app.use(express.urlencoded({extended: false}));


//Express Session 
app.use(session({
    secret: 'ravalravi',
    resave: false,
    saveUninitialized: true,
}));


//Passport Init 
app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res,next)=>{
      res.render('home.ejs');
})

app.get('/login',(req,res,next)=>{
       res.render('login.ejs');
})

app.get('/register',(req,res,next)=>{
      res.render('register.ejs')
})

app.get('/dashboard', ensureAuthenticated, (req,res,next)=>{
    res.render('dashboard.ejs')
})

app.get('/logout',(req,res,next)=>{
      req.logOut(); 
      res.redirect('/login')
})

app.post('/register', async (req,res,next)=>{
      const name = req.body.name ;
      const email = req.body.email;
      const password = req.body.password;

      const hashPassword = await bcrypt.hash(password,10);
       
      const user = new User({
          name : name ,
          email : email,
          password : hashPassword
      });

      user.save()
        .then((result)=>{
               console.log('SignUp succesFull');
               res.redirect('/login');
        })
        .catch((err)=>{
             console.log(err);
             res.redirect('/register');
        })
})

app.post('/login', (req,res,next)=>{
     passport.authenticate('local',{
         successRedirect: '/dashboard',
         failureRedirect : '/login'
     })(req,res,next)
})


mongoose.connect('mongodb://localhost:27017/new123')
   .then(()=>{
      console.log('Connted to Database !');
      app.listen(3000, ()=> console.log('server Started at Port 3000')); 
   })
   .catch((err)=>{
        console.log(err)
   })
