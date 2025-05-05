const imageTrack = document.querySelector('.image-track');
const images = imageTrack.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('click', () => {
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
    });

    // Prevent default drag behavior (no dragging the images)
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
