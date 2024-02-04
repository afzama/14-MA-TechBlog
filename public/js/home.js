// Selectors for title/desc of the post to comment on to show in modal
const commentTitle = $(".currentTitle");
const commentDesc = $(".currentDesc");

// Variable to store the current blogId
let blogId;

// Button to activate modal and prompt the user for a comment
$(".comment-button").on("click", async (e) => {
    blogId = e.target.id;

    // get the response back of the id of the blog clicked, so we can show that in the modal
    const response = await fetch(`/api/user/blogpost/${blogId}`);
    
    // handle the response coming back from the api
    const responseData = await response.json();

    commentTitle.text(responseData.title);
    commentDesc.text(responseData.description);

});

// Event listener for adding a comment
$(".addCommentButton").on("click", async (e) => {
    console.log("Add comment button was clicked");

    // Get the comment content from the input field
    const commentContent = $(".add-comment").val();

    // Check if comment content is not empty
    if (commentContent) {
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

            // redirect to the users profile to create new blogpost
            window.location.reload();
        } else {
            console.error("Failed to add comment!");
        }
    } else {
        console.error("Comment content cannot be empty!");
    }
});
