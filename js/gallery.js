const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startXViewport;
let currentXViewport;
let initialClickX;

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXViewport = e.clientX;
    initialClickX = e.clientX;
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
    if (Math.abs(e.clientX - initialClickX) < 10) { // Increased threshold
        const clickedImage = e.target; // Try using e.target directly first
        if (clickedImage && clickedImage.tagName === 'IMG') { // Ensure it's an IMG element
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
    currentXViewport = e.clientX;
    const translateX = startXViewport - currentXViewport;
    imageTrack.style.transform = `translateX(${translateX}px)`;
});

// Prevent default drag on individual images
images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
