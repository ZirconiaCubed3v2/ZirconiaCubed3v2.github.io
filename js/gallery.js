const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startX;
let currentX;
let initialClickX; // To track the initial click position

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - imageTrack.offsetLeft - imageTrack.getBoundingClientRect().left;
    initialClickX = e.pageX; // Capture initial mouse down position
    imageTrack.classList.add('dragging');
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
});

imageTrack.addEventListener('mouseup', (e) => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    // Check for click (minimal movement) on mouseup
    if (Math.abs(e.pageX - initialClickX) < 5) { // Adjust threshold as needed
        const clickedImage = e.target.closest('img');
        if (clickedImage) {
            const zoomedDiv = document.createElement('div');
            zoomedDiv.classList.add('zoomed');

            const zoomedImage = document.createElement('img');
            zoomedImage.classList.add('zoomed-image');
            zoomedImage.src = clickedImage.src;
            zoomedImage.alt = clickedImage.alt;

            zoomedDiv.appendChild(zoomedImage);
            document.body.appendChild(zoomedDiv);

            zoomedDiv.addEventListener('click', () => {
                document.body.removeChild(zoomedDiv);
            });
        }
    }
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.pageX - imageTrack.offsetLeft - imageTrack.getBoundingClientRect().left;
    const translateX = startX - currentX; // Inverted for correct scroll direction
    imageTrack.style.transform = `translateX(${translateX}px)`;
});

// Prevent default drag on individual images
images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
