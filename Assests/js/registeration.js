document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        if (validateLoginForm()) {
            alert("Login successful. Redirecting to welcome page...");
            window.location.href = 'index.html'; // Corrected redirection
        }
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        if (validateRegisterForm()) {
            alert("Registration successful. You can now login.");
            switchForm();
        }
    });

    function validateLoginForm() {
        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;

        if (username === "" || password === "") {
            alert("Please fill in all fields for login.");
            return false;
        }

        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert("Invalid username or password");
            return false;
        }

        return true;
    }

    function validateRegisterForm() {
        var username = document.getElementById('registerUsername').value;
        var email = document.getElementById('registerEmail').value;
        var password = document.getElementById('registerPassword').value;

        if (username === "" || email === "" || password === "") {
            alert("Please fill in all fields for registration.");
            return false;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        var users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(u => u.username === username || u.email === email)) {
            alert("Username or email already taken.");
            return false;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        return true;
    }


});
function switchForm() {
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}