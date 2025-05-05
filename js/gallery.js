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
    if (!loopEnabled || images.length > initialImageCount) return;

    const originalImages = Array.from(imageTrack.children).slice(0, initialImageCount);
    originalImages.forEach(img => {
        const duplicate = img.cloneNode(true);
        imageTrack.appendChild(duplicate);
    });

    firstSetWidth = initialImageCount * imageWidth;
    console.log("firstSetWidth:", firstSetWidth);
    imageTrack.style.width = (initialImageCount * 2) * imageWidth + 'px';
}

function loopGallery() {
    if (!loopEnabled || !isDragging || images.length <= initialImageCount || !firstSetWidth) return;

    const currentTranslateX = parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

    console.log("Current translateX (loop check):", currentTranslateX);
    console.log("startXViewport (before potential loop):", startXViewport);

    // Looping when scrolling to the right (towards negative translateX)
    if (currentTranslateX < -firstSetWidth + 10) {
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(0px)`;
        startXViewport += firstSetWidth;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
        console.log("Looped right. New startXViewport:", startXViewport);
    }

    // Looping when scrolling to the left (towards positive translateX)
    if (currentTranslateX > -10) {
        imageTrack.style.transition = 'none';
        imageTrack.style.transform = `translateX(${-firstSetWidth}px)`;
        startXViewport -= firstSetWidth;
        requestAnimationFrame(() => {
            imageTrack.style.transition = 'transform 0.3s ease-in-out';
        });
        console.log("Looped left. New startXViewport:", startXViewport);
    }
    console.log("startXViewport (after potential loop):", startXViewport);
}

setupLoop();

imageTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXViewport = e.clientX - (parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0);
    initialClickX = e.clientX;
    imageTrack.classList.add('dragging');
    imageTrack.style.transition = 'none';
    console.log("mousedown - startXViewport:", startXViewport);
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
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startXViewport;
    imageTrack.style.transform = `translateX(${deltaX}px)`;
    console.log("mousemove - deltaX:", deltaX, "startXViewport:", startXViewport, "translateX:", parseFloat(imageTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0);
    loopGallery();
});

images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
