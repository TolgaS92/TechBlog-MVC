const loginForm = async (event) => {
     event.preventDefault();
     const name = document.querySelector('#username-login').value.trim();
     const password = document.querySelector('#password-login').value.trim();

     if (name && password) {
         const response = await fetch('/api/user/login', {
             method: 'POST',
             body: JSON.stringify({ name, password }),
             headers: { 'Content-Type': 'application/json' },
         });
         
         if(response.ok) {
             document.location.replace('/');
         } else {alert('Failed to log in')};
     }
};

const signupForm = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert('Succesfully signed up!')
            document.location.replace('/');
        } else { alert('Failed to sign up!')}
    }
};

document.querySelector('#login-form').addEventListener('submit', loginForm);
document.querySelector('#signup-form').addEventListener('submit', signupForm);