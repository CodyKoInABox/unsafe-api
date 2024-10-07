document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const resultDiv = document.getElementById('loginResult');

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

    fetch(`https://unsafe-api.onrender.com/login/${username}/${password}`)
            .then(response => response.json())
            .then(data => {

                if (data) {

                    console.log('Login Response Data:', data); 
                }

                if (data.message) {

                    console.log('LOGIN OK: ', data.message);

                    resultDiv.textContent = 'Login successful!';
                    resultDiv.style.color = '#0f0';

                    // save the token to local storage
                    let token = data.session
                    localStorage.setItem("session", token);
                    console.log(data.session)

                    // Redirect to the dashboard
                    window.location.href = './dashboard.html';

                } else if (data.error) {

                    console.log('LOGIN ERROR: ', data.error);

                    resultDiv.textContent = `Error: ${data.error}`;
                    resultDiv.style.color = 'red';

                }
            })
            .catch(error => {

                console.error('LOGIN Fetch error:', error);

                resultDiv.textContent = `Error: ${error.error}`;
                resultDiv.style.color = 'red';

            });
}


});
