const nodeMailer = require('../config/nodemailer') ;

// another way of exporting a method

exports.newComment = (comment)  => {

     let htmlString = nodeMailer.renderTemplate({comment:comment} , '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
          from :'nithinparipelli2324@gmail.com' ,
          to : comment.user.email,
          subject:'new comment published', 

          html : htmlString


    },(err , info ) => {
        if(err) {
            console.log('Error in sending mail',err) ;
            return;

        } 
    //    console.log('Message sent' , info) ;
        return ;
        
    });
}