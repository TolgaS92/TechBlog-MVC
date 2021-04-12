let timer, currSeconds = 0;

function resetTimer() {
    /* Clear the previous interval */
    clearInterval(timer);

    /* Reset the seconds of the timer */
    currSeconds = 0;

    /* Set a new interval */
    timer =
    setInterval(startIdleTimer, 1000);
}

// Define the events that
// would reset the timer
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function startIdleTimer() {
    /* Increment the
    timer seconds */
    currSeconds++;
    if (currSeconds > 60) {
        logOut();
    }
}


const logOut = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout!');
    }
};

document.querySelector('#logout').addEventListener('click', logOut);
