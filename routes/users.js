const express = require('express');
const router = express.Router();
const passport = require('passport');
 const userController= require('../controllers/users_controllers'); 

 router.get('/profile/:id', passport.checkAuthentication,userController.profile); 
 router.post('/update/:id', passport.checkAuthentication,userController.update); 

 router.get('/sign-up',userController.signUp);
  router.get('/sign-in',userController.signIn);

 router.post('/create' , userController.create); 
  // use passport as a middleware to autheticate
 router.post('/create-session',passport.authenticate(
     'local',
     {failureRedirect: '/users/sign-in'} 

 ),userController.createSession); 
// apke m ye time lga rha tha itna ?. haan  ... it will shw the same thing..there?
 router.get('/sign-out',userController.destroySession); 



     module.exports = router;
