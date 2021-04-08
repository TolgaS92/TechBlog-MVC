const id = document.querySelector('#post-id').value;

const editPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
        alert('Failed to UPDATE!');
    }
};


document.querySelector('#update-btn').addEventListener('click', editPostHandler);


const deletePostHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to DELETE!')
    }
};

document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);