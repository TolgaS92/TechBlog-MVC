const id = document.querySelector('#post-id').value;

const commentHandleForm = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#commentary').value;
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to push your comment!');
    }
};

document.querySelector('#comment-btn').addEventListener('submit', commentHandleForm);
