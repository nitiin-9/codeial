 const mongoose = require('mongoose');

 const commentSchema = new mongoose.schema({
     content : {
         type:String,
         required:true
     } ,
      user : {
    type : mongoose.Schema.Types.ObjectId,
      ref : 'User'

      },

      post : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User'
      }



 } , {
     timestamps:true
 }); 

 const comment = mongoose.model('comment',commentSchema);
 module.exports = comment;