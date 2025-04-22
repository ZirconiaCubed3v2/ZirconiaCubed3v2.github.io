const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

let isDragging = false;
let startX;
let currentX;

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - imageTrack.offsetLeft - imageTrack.getBoundingClientRect().left; // Get initial mouse X relative to imageTrack's visual start
    imageTrack.classList.add('dragging');
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
    e.preventDefault();
    currentX = e.pageX - imageTrack.offsetLeft - imageTrack.getBoundingClientRect().left; // Get current mouse X relative to imageTrack's visual start
    const translateX = currentX - startX;
    imageTrack.style.transform = `translateX(${translateX}px)`;
});

// Prevent default drag on individual images
images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Zoom functionality (remains largely the same, but 'hasDragged' is removed for simplicity with this approach)
images.forEach(img => {
    img.addEventListener('click', () => {
        // Basic check if mouse moved significantly since mousedown
        if (Math.abs(currentX - startX) < 5) { // Adjust the threshold as needed
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
