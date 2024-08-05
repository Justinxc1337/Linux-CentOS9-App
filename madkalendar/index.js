async function fetchLunchAttendance() {
    const response = await fetch('/api/frokost-deltagelse');
    const data = await response.json();
    const tableBody = document.querySelector('#attendanceTable tbody');
    tableBody.innerHTML = '';
    data.forEach(event => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = new Date(event.dato).toLocaleString();
        const attendeesCell = document.createElement('td');
        attendeesCell.textContent = event.deltagere.join(', ');
        row.appendChild(dateCell);
        row.appendChild(attendeesCell);
        tableBody.appendChild(row);
    });
}

fetchLunchAttendance();
