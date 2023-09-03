{
  let CreateComment = function () {
     
    $(document).on("submit",".user-comment" ,(function (e) {
      e.preventDefault();
      // $(this )is reffreing to the (comment Form) on which event is triggerd
      var commentForm = $(this);

      
      $.ajax({
        type: "POST",
        url: "/comment/create",
        data: commentForm.serialize(),
        success: function (data) {
    
          let newComment = newCommentDom(data.comment)
          $(`.post-${data.post._id } .Comments_list`).prepend(newComment);
        },
        error: function (e) {
          console.log("error");
        },
      });
    }));
  };

  // Creating Comment
  let newCommentDom = function (comment) {
    return $(`<li>
            <p class="comments">
                ${comment.Comments}--<sub>
                        ${comment.user.name}
                    </sub>
              
                    <a href="/comment/delete/${comment._id}">delete</a>
    
            </p>
            </li>

    `);
  };

  CreateComment();
}
