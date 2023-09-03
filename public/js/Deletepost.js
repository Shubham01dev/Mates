{
  let DeletePost = function () {
    let post = $(".delete_post");

    post.click(function (event) {
     event.preventDefault();
     
      $.ajax({
        type: "get",
        url: $(".delete_post").prop("href"),

        success: (data) => {
          console.log("Post SuccessFult Deleted")
          $(`.post-${data.post._id}`).remove();
        },  
        error: (e) => {
          console.log("error While Deleting Post",e);
        },
      });
    });
  };

  DeletePost();
}
