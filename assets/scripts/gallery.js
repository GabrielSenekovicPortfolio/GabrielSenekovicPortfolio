window.addEventListener('load', () => {
    const gallery = document.querySelector('.portfolio-gallery');
    const galleryItems = document.querySelectorAll('.portfolio-gallery .gallery-item');

    // Calculate total width based on gallery items
    const itemWidth = galleryItems[0].offsetWidth;
    const columns = Math.floor(window.innerWidth / itemWidth);
    const galleryWidth = (columns * itemWidth + (columns - 1) * 10) / 2; // Adjust for gaps

    // Apply the calculated width to center the gallery
    gallery.style.width = `${galleryWidth}px`;
    gallery.style.margin = '0 auto';
});