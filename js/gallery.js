const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startXViewport; // Track start X relative to viewport
let currentXViewport; // Track current X relative to viewport
let initialClickX;

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXViewport = e.clientX; // Capture initial mouse X in viewport coordinates
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
    if (Math.abs(e.clientX - initialClickX) < 5) {
        const clickedImage = e.target.closest('img');
        if (clickedImage) {
            // Zoom logic (same as before)
        }
    }
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentXViewport = e.clientX; // Update current mouse X in viewport coordinates
    const translateX = startXViewport - currentXViewport; // Calculate translation based on viewport coordinates
    imageTrack.style.transform = `translateX(${translateX}px)`;
});

// Prevent default drag on individual images (remains the same)
// Zoom functionality (remains the same)
