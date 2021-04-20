 {   
     // method to submit the form data for new post using ajax
  //   console.log('hello there');
       let createPost = function() {
       
         let newPostForm = $('#new-post-form'); 
           newPostForm.submit(function(e){
                 e.preventDefault();
                 $.ajax({
                   type:'post',
                   url:'/posts/create',
                   data : newPostForm.serialize(),
                  success: function(data) {
                   console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost);
                    deletePost($(' .delete-post-button',newPost)); 

                    // noty of post published
                    new Noty({
                      theme : 'relax',
                 type: 'success',
                 layout: 'topRight',
                 text: 'Post is published',
                 timeout:1500
                 }).show();
                  }, error: function(error) {
                      console.log(error.responseText);
                  }
                  
                 });
                 
           });


       } 

       // meethod to create post using DOM  

       let newPostDom = function(post) {
           return $(`<li id ="post-${ post._id }">
        <p>  
              
                    <small>
                         <a  class ="delete-post-button"href="/posts/destroy/${ post._id}">X</a>
                    </small> 
            
             ${post.content} 
      <br>
           <small>
             ${ post.user.name } 
      
           </small> 
                 <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
       </p>
              <div class="post-comments"> 
               
        
          <form action="/comments/create" method="POST"> 
                 <input type="text" name="content" placeholder="Type here to add a commment" required>
                 <input type="hidden" name="post" value="${post._id}">
                 <input type="submit"  value="Add comment">
             
          </form> 

 
       
        <div class="post-comments-list"> 
               <ul id="post-comments-${post._id}">  
                   
             
          </ul>
     </div>
          
      
 </div>

 </li>`)

       } 

       let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove(); 
                    // noty to delete
                    new Noty({
                            theme :'relax',
                            type: 'success',
                            layout: 'topRight',
                            text: 'Post is Deleted',
                            timeout:1500
                            }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    } 

    // delete the existing posts

    let convertPostsToAjax = function() {
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self); 
            deletePost(deleteButton); 
              // get the post's id by splitting the id attribute 
                let postId = self.prop('id').split("-")[1];
                 new PostComments(postId);

        })


    }

    createPost();  
    convertPostsToAjax(); 

 }