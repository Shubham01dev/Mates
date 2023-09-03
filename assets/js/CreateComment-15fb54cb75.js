{let e=function(){$(document).on("submit",".user-comment",function(e){e.preventDefault();e=$(this);$.ajax({type:"POST",url:"/comment/create",data:e.serialize(),success:function(e){var t=n(e.comment);$(`.post-${e.post._id} .Comments_list`).prepend(t)},error:function(e){console.log("error")}})})},n=function(e){return $(`<li>
            <p class="comments">
                ${e.Comments}--<sub>
                        ${e.user.name}
                    </sub>
              
                    <a href="/comment/delete/${e._id}">delete</a>
    
            </p>
            </li>

    `)};e()}