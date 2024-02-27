const playground = document.getElementById('playground');
const ball = document.getElementById('ball');
const message = document.getElementById('message');

playground.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Click inside the container
    const offsetX = clickX - playground.offsetLeft - ball.offsetWidth / 2;
    const offsetY = clickY - playground.offsetTop - ball.offsetHeight / 2;

    ball.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

document.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    const playgroundRect = playground.getBoundingClientRect();

    if (
        clickX < playgroundRect.left ||
        clickX > playgroundRect.right ||
        clickY < playgroundRect.top ||
        clickY > playgroundRect.bottom
    ) {
        // Click outside the container
        message.style.display = 'block';
        message.style.left = `${clickX}px`;
        message.style.top = `${clickY}px`;
        message.textContent = 'Clicked outside the container!';

        // Hide the message after 2 seconds
        setTimeout(() => {
            message.style.display = 'none';
        }, 2000);
    }
});

ball.addEventListener('click', (event) => {
    // Prevent the click event from bubbling up to the container
    event.stopPropagation();
});
