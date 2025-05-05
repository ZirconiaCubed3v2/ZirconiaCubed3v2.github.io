const galleryContainer = document.querySelector('.gallery-container');
const imageTrack = document.querySelector('.image-track');
const images = Array.from(imageTrack.children);
const originalImageCount = images.length / 2;
const imageWidth = images[0].offsetWidth + parseInt(window.getComputedStyle(images[0]).marginRight) || 0;
let isDragging = false;
let startXViewport;
let initialClickX;
let loopEnabled = true;
let firstSetWidth;

function setupLoop() {
    if (!loopEnabled || images.length > originalImageCount) return;

    const originalImages = images.slice();
    originalImages.forEach(img => {
        const duplicate = img.cloneNode(true);
        imageTrack.appendChild(duplicate);
    });

    firstSetWidth = originalImageCount * imageWidth;
    imageTrack.style.width = (originalImageCount * 2) * imageWidth + 'px';
}

function loopGallery() {
    console.log("loopGallery() called. isDragging:", isDragging); // ADDED LOG
    if (!loopEnabled || !isDragging || images.length <= originalImageCount || !firstSetWidth) return;

    const currentTranslateX = parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

    console.log("Current translateX:", currentTranslateX);
    console.log("firstSetWidth:", firstSetWidth);
    console.log("startXViewport before loop:", startXViewport);

    // Looping when scrolling to the right (towards negative translateX)
    if (currentTranslateX < -firstSetWidth) {
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(0px)`;
        startXViewport += firstSetWidth;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
        console.log("Looped right. New startXViewport:", startXViewport);
    }

    // Looping when scrolling to the left (towards positive translateX)
    if (currentTranslateX > 0) {
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(${-firstSetWidth}px)`;
        startXViewport -= firstSetWidth;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
        console.log("Looped left. New startXViewport:", startXViewport);
    }
}

setupLoop();

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXViewport = e.clientX - (parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0);
    initialClickX = e.clientX;
    imageTrack.classList.add('dragging');
    imageTrack.style.transition = 'none';
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
    console.log("mousemove called. isDragging:", isDragging); // ADDED LOG
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
