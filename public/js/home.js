// Event listener for showing the comment modal
$(".comment-button").on("click", async (e) => {
    const blogId = e.target.id;

    // get the response back of the id of the blog clicked, so we can show that in the modal
    const response = await fetch(`/api/user/blogpost/${blogId}`);

    // handle the response coming back from the api
    const responseData = await response.json();

    $(".currentTitle").text(responseData.title);
    $(".currentDesc").text(responseData.description);
});

// Event listener for adding a comment
$(".addCommentButton").on("click", async () => {
    console.log("Add comment button was clicked");

    // Get the comment content from the input field
    const commentContent = $(".add-comment").val();

    // Check if comment content is not empty
    if (commentContent) {
        const blogId = $(".comment-button").attr("id");

        const commentData = {
            content: commentContent,
            blogpost_id: blogId
        };

        // send a request to the comment route
        const response = await fetch(`/api/user/blogpost/${blogId}/comment`, {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // deal with the response
        const responseData = await response.json();

        // on success - reload the page
        if (responseData.success) {
            console.log("New Comment Added!");

            // redirect to the users profile to create a new blog post
            window.location.reload();
        } else {
            console.error("Failed to add comment!");
        }
    } else {
        console.error("Comment content cannot be empty!");
    }
});
