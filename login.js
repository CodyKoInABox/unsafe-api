document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // toggle password
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        togglePassword.src = type === 'text' ? './assets/hide.png' : './assets/show.png';
    });
    

    // login function
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = passwordInput.value;


    loginUser(username, password);
});

// Function to handle login
function loginUser(username, password) {

    console.log('Login - Username:', username);
    console.log('Login - Password:', password);

    fetch(`http://localhost:8080/login/${username}/${password}`)
    .then(response => {

        if (response.status == 200) {

            console.log('LOGIN OK');

        } else if (response.status == 400) {

            console.log('LOGIN ERROR');

        } else {

            console.log('LOGIN Unexpected error: ', response.status);
            
        }
    })
    .catch(error => {
        console.error('LOGIN Fetch error:', error);
    });
}


});
