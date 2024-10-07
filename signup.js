document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // toggle password
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        togglePassword.src = type === 'text' ? './assets/hide.png' : './assets/show.png';
    });

    // signup function
 signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    signupUser(username, password);
});


// Function to handle sign-up
function signupUser(username, password) {

    console.log('Sign-up - Username:', username);
    console.log('Sign-up - Password:', password);

    fetch(`http://localhost:8080/signup/${username}/${password}`)
    .then(response => {

        if (response.status == 200) {

            console.log('SIGNUP OK');

        } else if (response.status == 400) {

            console.log('SIGNUP ERROR');

        } else {

            console.log('SIGNUP Unexpected error: ', response.status);
            
        }
    })
    .catch(error => {
        console.error('LOGIN Fetch error:', error);
    });
}


});
