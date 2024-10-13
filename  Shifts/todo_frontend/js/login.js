const apiUrl = 'http://localhost:5000';
console.log('Token has been deleted');

async function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('User registered successfully');
        const data = await response.json();
        const token = data.access_token;
        const id = data.access_id;
        const expiresIn = data.expires_in; // Token expiration time in seconds

        console.log('Logged in successfully');

        // Set token, user id, username, and expiration time in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userid', id);
        localStorage.setItem('username', username);

        // Calculate the expiration time and store it
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('tokenExpiration', expirationTime);

        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging in user:', error);
        alert(error.message);
    }
}

function checkTokenExpiration() {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
        const expirationTime = parseInt(tokenExpiration, 10);
        if (new Date().getTime() > expirationTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
            localStorage.removeItem('tokenExpiration');
            return false;
        }
        return true;
    }
    return false;
}

// Usage: Call checkTokenExpiration before sensitive actions
if (!checkTokenExpiration()) {
    alert('Your session has expired. Please log in again.');
    window.location.href = 'login.html';
}



