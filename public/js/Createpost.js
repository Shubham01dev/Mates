{
  let createPost = function () {
    let newPost = $("#user_post");
    newPost.submit(function (e) {
      e.preventDefault();
     
      $.ajax({
        type: "POST",
        url: "/post/create",
        data: newPost.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.post);
          $(".post_list").prepend(newPost);
        },
        error(e) {
          console.log("a new error occured", e);
        },
      });
    });
  };

  //    method to create a post in DOM;
  let newPostDom = function (post) {
    return $(`<li class="post-${post._id}">
                        <h2>
                           ${post.content} &nbsp;<sub>Posted by--${post.user.name}</sub>
                           <a href="/post/delete/${post._id}" class="delete_post">delete</a>
                        </h2>

                        <ul class="comments" type="none">
                         <li>
                          <form action="/comment/create"  class="user-comment"  method="post">
                           <input name="Comments" id="content" cols="30" rows="1" placeholder="Enter Your comment..."></input>
                           <input type="hidden" name="post" value="${post._id}">
                           <button type="submit">Comment</button>
                          </form>
                          </li>

                           <li class="Comments_list"></li>
                        </ul>
                        
                 </li>
                 <br>
                 `);
  };

  createPost();
}
