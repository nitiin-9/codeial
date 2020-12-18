const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');
 console.log('router is loaded');

 router.get('/',homeController.home); 
 router.use('/users',require('./users'));
 // for any other further routes
 // router.use('/routerName', require('./routerFile));
module.exports= router;