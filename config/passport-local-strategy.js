const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy; 

const User = require('../models/user');

// authentication using passport 

passport.use(new LocalStrategy({
    usernameField:'email'


},
     function(email,password , done ){
         // find a user establish idenetity

         User.findOne({email:email},function(err,user){
             if(err) {
                 console.log('Error in finding user --> passport');
                 return done(err);
             }
             if( !user || user.password!= password ){
                 console.log('Invalid username/password');
                 return done(null,false);
             }
             return done(null,user);
         });
     }
) ); 



// serialize the user to decide  which key is to be kept in cookies

passport.serializeUser(function(user,done){
   done(null,user.id);
})





// deserialize  the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err) {
             console.log('Error in finding user --> passport');
                 return done(err);
        }
        return done(null,user);
    });
}); 

 passport.checkAuthentication = function(req, res , next){
     // if user is sighned then pass on the request to the next function(controllers action)
     if(req.isAuthenticated()){
         return next();
     }
     // if user is not signed in 
     return res.redirect('/users/sign-in');
 } 
 passport.setAuthenticatedUser = function(req,res,next) {
  if(req.isAuthenticated()) {
       res.locals.user = req.user;
       // req.user contains current signed in user from the session cookie and we are sending this to the locals for the views
   } 
      next();
 }
module.exports = passport;