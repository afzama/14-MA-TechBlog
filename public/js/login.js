// Wrapped in a function to be called after the DOM is fully loaded
function setupEventListeners() {

  const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const responseBody = await response.json(); // Parse the response body as JSON
          console.error(responseBody); // Log the response body to the console
          alert(response.statusText);
        } else {
          // Redirect to the homepage if login is successful
          window.location.href = '/';
        }
      } catch (error) {
        console.error(error);
        // Handle errors, e.g., show an error message to the user

        // Attach the event listener to the login form
        document.querySelector('#login-login').addEventListener('submit', loginFormHandler);
      }
    }
  }

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');

  // Data from login and signup forms
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
};

document.addEventListener('DOMContentLoaded', setupEventListeners);