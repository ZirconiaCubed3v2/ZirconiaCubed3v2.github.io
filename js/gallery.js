const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startX;
let scrollLeft;
let dragTimeout; // To detect if a drag has occurred

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - imageTrack.offsetLeft;
    scrollLeft = imageTrack.scrollLeft;
    imageTrack.classList.add('dragging');
    clearTimeout(dragTimeout); // Clear any pending timeout
    dragTimeout = setTimeout(() => {
        // If the mouse is still down after a short delay, consider it a potential drag
        if (isDragging) {
            imageTrack.classList.add('actively-dragging'); // Add a class to indicate active drag
        }
    }, 100); // Adjust the delay (in milliseconds) as needed
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    imageTrack.classList.remove('actively-dragging');
    clearTimeout(dragTimeout);
});

imageTrack.addEventListener('mouseup', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    imageTrack.classList.remove('actively-dragging');
    clearTimeout(dragTimeout);
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent text selection during drag
    const x = e.pageX - imageTrack.offsetLeft;
    const walk = (x - startX) * 1;
    imageTrack.scrollLeft = scrollLeft - walk;
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
        // Only zoom if we are NOT actively dragging (indicated by the class)
        if (!imageTrack.classList.contains('actively-dragging')) {
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
    });
});
