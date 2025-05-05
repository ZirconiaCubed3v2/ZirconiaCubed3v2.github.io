const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const initialImageCount = imageTrack.children.length;
const images = Array.from(imageTrack.children);
const imageWidth = images[0].offsetWidth + parseInt(window.getComputedStyle(images[0]).marginRight) || 0;
let isDragging = false;
let startXViewport;
let initialClickX;
let loopEnabled = true;
let firstSetWidth;

function setupLoop() {
    if (!loopEnabled || images.length > initialImageCount * 3) return; // Limit to a reasonable number of duplicates

    const originalImages = Array.from(imageTrack.children).slice(0, initialImageCount);
    for (let i = 0; i < 2; i++) { // Duplicate twice: original + 2 copies
        originalImages.forEach(img => {
            const duplicate = img.cloneNode(true);
            imageTrack.appendChild(duplicate);
            duplicate.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        });
    }

    firstSetWidth = initialImageCount * imageWidth;
    imageTrack.style.width = (initialImageCount * 3) * imageWidth + 'px';
    // Optionally, set initial position to the start of the second set
    imageTrack.style.transform = `translateX(${-firstSetWidth}px)`;
}

function loopGallery() {
    if (!loopEnabled || !isDragging || images.length <= initialImageCount * 2 || !firstSetWidth) return;

    const currentTranslateX = parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

    // Looping when scrolling to the right (past the second virtual set)
    if (currentTranslateX < -firstSetWidth * 2) {
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(${-firstSetWidth}px)`; // Reset to the middle
        startXViewport += firstSetWidth * 2;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
    }
    // Looping when scrolling to the left (before the first virtual set)
    else if (currentTranslateX > -firstSetWidth * 0.9) { // Adjusted left threshold (closer to -firstSetWidth)
        console.log("Looping Left Triggered!");
        console.log("currentTranslateX:", currentTranslateX);
        console.log("firstSetWidth:", firstSetWidth);
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(${-firstSetWidth * 1}px)`; // Reset to the middle
        startXViewport -= firstSetWidth * 2;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
    }
}

setupLoop();

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    const currentTranslateX = parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    startXViewport = e.clientX - currentTranslateX; // Anchor startX to the current visual position
    initialClickX = e.clientX;
    imageTrack.classList.add('dragging');
    imageTrack.style.transition = 'none';
    console.log("mousedown - startXViewport:", startXViewport, "currentTranslateX:", currentTranslateX);
});

imageTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    imageTrack.classList.remove('dragging');
    imageTrack.style.transition = 'transform 0.3s ease-in-out';
});

imageTrack.addEventListener('mouseup', (e) => {
    isDragging = false; // Ensure isDragging is set to false on mouseup
    imageTrack.classList.remove('dragging');
    imageTrack.style.transition = 'transform 0.3s ease-in-out';
    const clickDeltaX = Math.abs(e.clientX - initialClickX);
    if (clickDeltaX < 10) {
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
    initialClickX = null;
});

imageTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startXViewport;
    imageTrack.style.transform = `translateX(${deltaX}px)`;
    loopGallery();
});

images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
