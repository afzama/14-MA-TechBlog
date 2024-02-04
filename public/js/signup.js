// Create the variables for the input fields we are needing to keep track of
const nameSignup = $("#name-signup");
const emailSignup = $("#email-signup");
const passwordSignup = $("#password-signup");

// Event listener placed on the login form to track submissions
$(".signup-form").on("submit", async (e) => {
    e.preventDefault();

    try {

        const signupData = {
            name: nameSignup.val(),
            email: emailSignup.val(),
            password: passwordSignup.val()
        };

        console.log("Signup Data sent by user:")
        console.log(signupData);

        // Send a resopne to the post request
        const response = await fetch('/api/user/signup', {
            method: "POST",
            body: JSON.stringify(signupData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseData = await response.json();
        console.log("Response Data:----------------------------------", responseData);

        if (responseData.success) {
            console.log("You are now signed in and redirected to your profile page to create your own blogpost!");
            window.location.replace('/profile');
        } else {
            console.log("Something went wrong! Try again!")
        }

    } catch (err) {
        console.log(err)
    }
});