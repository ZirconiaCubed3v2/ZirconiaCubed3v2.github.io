const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startX;
let scrollLeft;

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - imageTrack.offsetLeft;
    scrollLeft = imageTrack.scrollLeft;
    imageTrack.classList.add('dragging');
    e.preventDefault(); // Prevent the browser's default drag behavior on images
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
});

imageTrack.addEventListener('mouseup', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - imageTrack.offsetLeft;
    const walk = (x - startX) * 1;
    imageTrack.scrollLeft = scrollLeft - walk;
});

// Zoom functionality (remains the same)
images.forEach(img => {
    img.addEventListener('click', () => {
        const zoomedDiv = document.createElement('div');
        zoomedDiv.classList.add('zoomed');

        const zoomedImage = document.createElement('img');
        zoomedImage.classList.add('zoomed-image');
        zoomedImage.src = img.src;
        zoomedImage.alt = img.alt;

        zoomedDiv.appendChild(zoomedImage);
        document.body.appendChild(zoomedDiv);

        zoomedDiv.addEventListener('click', () => {
            document.body.removeChild(zoomedDiv);
        });
    });
});
