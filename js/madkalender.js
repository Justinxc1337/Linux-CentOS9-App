function addName(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    if (name) {
        const newItem = document.createElement('div');
        newItem.textContent = name;
        newItem.classList.add('draggable');
        newItem.setAttribute('draggable', 'true');
        newItem.addEventListener('dragstart', dragStart);

        const noBox = document.getElementById('no-box');
        noBox.appendChild(newItem);

        nameInput.value = '';
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(data);
    const dropzone = event.target.closest('.box');

    if (dropzone && draggableElement) {
        dropzone.appendChild(draggableElement);
        event.dataTransfer.clearData();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let idCounter = 1;
    document.getElementById('nameForm').addEventListener('submit', () => {
        const newItem = document.querySelector('.draggable:last-child');
        if (newItem) {
            newItem.id = 'item-' + idCounter++;
        }
    });
});