loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`/login?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const user = await response.json();

        if (user && user.password === password) {
            localStorage.setItem('userId', user._id); // Store userId in localStorage
            window.location.href = 'calendar.html'; // Redirect to calendar
        } else {
            message.textContent = 'Invalid email or password';
        }
    } catch (error) {
        console.error('Login error:', error);
        message.textContent = 'An error occurred';
    }
});