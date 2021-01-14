 const Post = require('../models/post');



module.exports.home= function(req,res) {
    // console.log(req.cookies);
    //  res.cookie('user_id',25); 

//    Post.find({}, function(err, posts){
//          return res.render('home' , {
//    title : ' codeial | Home' ,
//       posts : posts
//     });
    
//    }); 
 // populate the user of each posts
   Post.find({}).populate('user').exec(function(err,posts){
              return res.render('home' , {
   title : ' codeial | Home' ,
      posts : posts
    });
   });
  
   

}