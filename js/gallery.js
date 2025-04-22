const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = Array.from(imageTrack.children); // Get a live array of image elements
const imageWidth = images[0].offsetWidth + parseInt(window.getComputedStyle(images[0]).marginRight) || 0; // Get width + margin
let isDragging = false;
let startXViewport;
let initialClickX;
let loopEnabled = true; // Control the looping behavior
let firstSetWidth;

function setupLoop() {
    if (!loopEnabled || images.length === 0) return;

    // Duplicate the images at the end
    images.forEach(img => {
        const duplicate = img.cloneNode(true);
        imageTrack.appendChild(duplicate);
    });

    firstSetWidth = images.length * imageWidth; // Width of the original set
    imageTrack.style.width = (images.length * 2) * imageWidth + 'px'; // Set wider track width
}

function loopGallery() {
    if (!loopEnabled || !isDragging || images.length === 0 || !firstSetWidth) return;

    const currentTranslateX = parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

    // Looping when reaching the end of the first set (scrolling right)
    if (currentTranslateX < -firstSetWidth) {
        imageTrack.style.transition = 'none'; // Disable transition for instant shift
        imageTrack.style.transform = `translateX(${currentTranslateX + firstSetWidth}px)`;
        requestAnimationFrame(() => { // Ensure the DOM has updated before re-enabling transition
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
    }

    // Looping when reaching the beginning of the first set (scrolling left)
    if (currentTranslateX > 0) {
        imageTrack.style.transition = 'none'; // Disable transition for instant shift
        imageTrack.style.transform = `translateX(${currentTranslateX - firstSetWidth}px)`;
        requestAnimationFrame(() => { // Ensure the DOM has updated before re-enabling transition
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
    }
}

// Initial setup for the loop
setupLoop();

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXViewport = e.clientX - (parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0);
    initialClickX = e.clientX;
    imageTrack.classList.add('dragging');
    imageTrack.style.transition = 'none'; // Disable transition during drag
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    imageTrack.style.transition = 'transform 0.3s ease-in-out';
});

imageTrack.addEventListener('mouseup', (e) => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    imageTrack.style.transition = 'transform 0.3s ease-in-out';
    if (Math.abs(e.clientX - initialClickX) < 10) {
        const clickedImage = e.target;
        if (clickedImage && clickedImage.tagName === 'IMG') {
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
    const deltaX = e.clientX - startXViewport;
    imageTrack.style.transform = `translateX(${deltaX}px)`;
    loopGallery(); // Check for looping conditions on every mousemove
});

// Prevent default drag on individual images
images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
