{let e=function(){let t=$("#user_post");t.submit(function(e){e.preventDefault(),$.ajax({type:"POST",url:"/post/create",data:t.serialize(),success:function(e){e=o(e.post);$(".post_list").prepend(e)},error(e){console.log("a new error occured",e)}})})},o=function(e){return $(`<li class="post-${e._id}">
                        <h2>
                           ${e.content} &nbsp;<sub>Posted by--${e.user.name}</sub>
                           <a href="/post/delete/${e._id}" class="delete_post">delete</a>
                        </h2>

                        <ul class="comments" type="none">
                         <li>
                          <form action="/comment/create"  class="user-comment"  method="post">
                           <input name="Comments" id="content" cols="30" rows="1" placeholder="Enter Your comment..."></input>
                           <input type="hidden" name="post" value="${e._id}">
                           <button type="submit">Comment</button>
                          </form>
                          </li>

                           <li class="Comments_list"></li>
                        </ul>
                        
                 </li>
                 <br>
                 `)};e()}