function login(event) {
    event.preventDefault();
    document.querySelector('.login-container').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    initializeList();
}

function initializeList() {
    const noList = document.getElementById('no-list');
    const li = document.createElement('li');
    li.textContent = 'brugernavn';
    noList.appendChild(li);
}

function toggleAttendance() {
    const yesList = document.getElementById('yes-list');
    const noList = document.getElementById('no-list');
    const username = 'brugernavn';

    if (noList.querySelector('li').textContent === username) {
        const yesItem = document.createElement('li');
        yesItem.textContent = username;
        yesList.appendChild(yesItem);
        noList.innerHTML = '';
    }
}
