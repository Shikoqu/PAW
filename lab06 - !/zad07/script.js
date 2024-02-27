let currentIndex = 0;

function openModal(imageSrc) {
    currentIndex = getImageIndex(imageSrc);
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImage.src = imageSrc;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;
    const images = document.querySelectorAll('.gallery-image');

    if (currentIndex >= images.length)
        currentIndex = 0;
    else if (currentIndex < 0)
        currentIndex = images.length - 1;

    const modalImage = document.getElementById('modal-image');
    modalImage.src = images[currentIndex].src;
}

function getImageIndex(imageSrc) {
    const images = document.querySelectorAll('.gallery-image');
    for (let i = 0; i < images.length; i++)
        if (images[i].src === imageSrc)
            return i;

    return 0;
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape')
        closeModal();
    else if (event.key === 'ArrowLeft')
        changeImage(-1);
    else if (event.key === 'ArrowRight')
        changeImage(1);
});
