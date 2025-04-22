const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startX;
let scrollLeft;
let hasDragged = false; // Flag to track if a drag has occurred

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - imageTrack.offsetLeft;
    scrollLeft = imageTrack.scrollLeft;
    imageTrack.classList.add('dragging');
    hasDragged = false; // Reset the drag flag on mousedown
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    hasDragged = false;
});

imageTrack.addEventListener('mouseup', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const mouseXWithinTrack = e.pageX - imageTrack.offsetLeft;
    const scrollAmount = mouseXWithinTrack - (startX - imageTrack.offsetLeft);
    imageTrack.scrollLeft = scrollLeft - scrollAmount;
    console.log("imageTrack.scrollLeft:", imageTrack.scrollLeft);
    hasDragged = true;
});

// Prevent default drag on individual images
images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Zoom functionality
images.forEach(img => {
    img.addEventListener('click', () => {
        // Only zoom if a drag has NOT occurred
        if (!hasDragged) {
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
        }
        // Reset the drag flag after the click attempt
        hasDragged = false;
    });
});
