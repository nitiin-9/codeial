const express= require('express'); 
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app= express(); 
require('./config/view_helpers')(app);
const port =8000; 

const expressLayouts = require('express-ejs-layouts'); 

const db = require('./config/mongoose'); 
// used for session cookie

const session = require('express-session');
const passport= require('passport'); 
const passportLocal = require('./config/passport-local-strategy');  
const passportJWT = require('./config/passport-jwt-strategy') ; 
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session); 
const sassMiddleware = require('node-sass-middleware'); 
const flash = require('connect-flash'); 
const customMware = require('./config/middleware');  
 

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

 app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.static(__dirname + '/assets'));

app.use(express.urlencoded()); 

app.use(cookieParser());

app.use(express.static(env.asset_path));  
// make the uploads available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options)); 




app.use(expressLayouts);
// extract style and scripts  from subpages  into layout 

app.set('layout extractStyles' , true); 
app.set('layout extractScripts' , true);


// set up view engine
app.set('view engine','ejs');
app.set('views' ,'./views') 
// mongo store is used to store session cookie in the db
app.use(session({
name :'codeial',
// to do change the scret before deployemnt in production mode
secret : env.session_cookie_key,
 saveUninitialized: false,
 resave : false,

 cookie : {
   maxAge:(1000*60*100)
 },
 store : new MongoStore({
    mongooseConnection : db,
    autoRemove : 'disabled'

 },  
      function(err){
        console.log(err || 'connect-mongo db  set ok');
      }
 )


}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser); 
app.use(flash()); 
app.use(customMware.setFlash);
// use express router

app.use('/',require('./routes')); 

app.listen(port,function(err){
  if(err) {console.log(`Error in running the server ${err}`);} 
  console.log(`server is running on port : ${port}`);


});