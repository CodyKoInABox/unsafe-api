


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // toggle password
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        
        if (type === 'text') {
            togglePassword.src = './assets/hide.png'; 
        } else {
            togglePassword.src = './assets/show.png';
        }
    });


    loginForm.addEventListener('submit', function(event) {

        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        
        console.log('Username:', username);
        console.log('Password:', password);
    });
});
