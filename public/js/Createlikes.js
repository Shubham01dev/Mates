
{
  let CreateLikes = function () {
    $(document).on("click", ".Like", function (e) {
      e.preventDefault();
      var commentForm = $(this);
      $.ajax({
        url: `${commentForm.attr("action")}`,
        type: "POST",
        success: function (data) {
          if (data.delete == true) {
                commentForm.find("> .Post_like")[0].innerText = data.likeabels.like.length
                
          }else{
            commentForm.find("> .Post_like")[0].innerText = data.likeabels.like.length
          }
          
        },
      });
    });
  };

  CreateLikes();
}
