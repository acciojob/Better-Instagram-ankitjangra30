// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const parent = document.getElementById('parent');
    const images = parent.querySelectorAll('.image');
    let draggedItem = null;

    images.forEach(image => {
        image.addEventListener('dragstart', handleDragStart);
        image.addEventListener('dragover', handleDragOver);
        image.addEventListener('drop', handleDrop);
    });

    function handleDragStart(e) {
        draggedItem = this; // Store the dragged element
        e.dataTransfer.setData('text/html', this.innerHTML); // For Firefox compatibility
        e.dataTransfer.effectAllowed = 'move'; // Indicate a move operation
        this.classList.add('dragging'); // Add a class for styling during drag
    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessary to allow drop
        if (draggedItem !== this) {  //check to avoid flickering
            this.classList.add('drag-over'); // Visual feedback
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        if (draggedItem !== this) {
            const draggedImageHTML = e.dataTransfer.getData('text/html');
            const targetImageHTML = this.innerHTML;

            // Swap images (content)
            draggedItem.innerHTML = targetImageHTML;
            this.innerHTML = draggedImageHTML;

        }
        this.classList.remove('drag-over');
        draggedItem.classList.remove('dragging');
    }

    images.forEach(image => {
        image.addEventListener('dragend', handleDragEnd);
    });

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        images.forEach(image => image.classList.remove('drag-over')); //Remove drag over from all
        draggedItem = null; // Reset dragged item
    }
});