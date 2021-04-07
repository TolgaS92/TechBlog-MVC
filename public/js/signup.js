const signupForm = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name, password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else { alert('Failed to sign up!')}
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupForm);