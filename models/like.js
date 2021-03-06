const mongoose = require('mongoose') ;

const likeSchema = new mongoose.Schema({
  user : {
      type : mongoose.Schema.ObjectId
  }, 
  // defines the objectid of liked object
  likeable: {
      type : mongoose.Schema.ObjectId,
      required : true,
      refPath:'onModel'
  } ,
  // defining the type of liked object since it is dynamic reference
  onModel : {
      type:String,
      required : true,
      enum : ['Post','Comment']
  }
 

},{
    timestamps : true
});  

const Like = mongoose.model('Like',likeSchema) ;

module.exports = Like;