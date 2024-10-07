document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const resultDiv = document.getElementById('signupResult');
    const loadingIcon = document.getElementById('loadingIcon');

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

    loadingIcon.style.display = 'block'; // Show the loading icon

    fetch(`https://unsafe-api.onrender.com/signup/${username}/${password}`)
            .then(response => response.json())
            .then(data => {

                loadingIcon.style.display = 'none'; // Hide the loading icon

                if (data) {

                    console.log('Signup Response Data:', data);
                    
                }

                if (data.message) {

                    console.log('SIGNUP OK: ', data.message);

                    resultDiv.textContent = 'Sign-up successful!';
                    resultDiv.style.color = '#0f0';

                } else if (data.error) {

                    console.log('SIGNUP ERROR: ', data.error);

                    resultDiv.textContent = `Error: ${data.error}`;
                    resultDiv.style.color = 'red';

                }
            })
            .catch(error => {

                loadingIcon.style.display = 'none'; // Hide the loading icon

                console.error('SIGNUP Fetch error:', error);

                resultDiv.textContent = `Error: ${error.error}`;
                resultDiv.style.color = 'red';

            })
}


});
