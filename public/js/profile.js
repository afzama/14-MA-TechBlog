const newFormHandler = async (event) => {
    event.preventDefault();
  
    try {
      const blogTitle = document.querySelector('#blog-title').value.trim();
      const blogContent = document.querySelector('#blog-desc').value.trim();
  
      if (blogTitle && blogContent) {
        const response = await fetch(`/api/user/blog`, {
          method: 'POST',
          body: JSON.stringify({ blogTitle, blogContent }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const responseData = await response.json();
        if (responseData.success) {
          console.log("New post created!");
          window.location.reload();
        } else {
          console.log("Blog not posted! Try again!");
        }
      }
  
    } catch (err) {
      console.log(err);
    }
  };
  
  const delButtonHandler = async (event) => {
    try {
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/user/blog/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          console.error('Failed to delete blog post');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editFormHandler = async (event) => {
    event.preventDefault();

    try {
        const id = document.querySelector('#edit-post-id').value;
        const updatedTitle = document.querySelector('#edit-blog-title').value.trim();
        const updatedContent = document.querySelector('#edit-blog-Content').value.trim();

        if (updatedTitle && updatedContent) {
            const response = await fetch(`/api/user/blog/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: updatedTitle, blogContent: updatedContent }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            if (responseData.success) {
                console.log("Post updated!");
                window.location.reload();
            } else {
                console.log("Failed to update post! Try again!");
            }
        }

    } catch (err) {
        console.log(err);
    }
};

// Attach event listener to the edit form
document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);
  
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  
  // Replaced '.blog-list' with the actual selector for the delete button
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-blog-button')) {
      delButtonHandler(event);
    }
  });
  