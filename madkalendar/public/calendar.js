document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar');
    const monthYearSpan = document.getElementById('monthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const makeAllGreenButton = document.getElementById('makeAllGreen');
    const makeAllRedButton = document.getElementById('makeAllRed');
    const confirmChangesButton = document.getElementById('confirmChanges');
    const logoutButton = document.getElementById('logout');

    let currentDate = new Date();
    let selectedDates = [];
    const userId = localStorage.getItem('userId');

    if (!userId) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
        return;
    }

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYearSpan.textContent = `${getMonthName(month)} ${year}`;

        // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const firstDay = new Date(year, month, 1).getDay();
        // Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = '<table><thead><tr>';
        const days = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
        days.forEach(day => {
            html += `<th class="${day === 'Lør' || day === 'Søn' ? 'greyed' : ''}">${day}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Calculate the number of rows needed
        const totalCells = (firstDay === 0 ? 6 : firstDay - 1) + daysInMonth; // Adjust for starting day
        const rows = Math.ceil(totalCells / 7);

        for (let row = 0; row < rows; row++) {
            html += '<tr>';

            for (let col = 0; col < 7; col++) {
                const dayNumber = row * 7 + col - (firstDay === 0 ? 6 : firstDay - 1) + 1;
                const isWeekend = col === 5 || col === 6; // Saturday = 5, Sunday = 6

                if (dayNumber > 0 && dayNumber <= daysInMonth) {
                    html += `<td class="${isWeekend ? 'greyed' : ''}" data-date="${dayNumber}" ${isWeekend ? 'style="pointer-events: none;"' : ''}>${dayNumber}</td>`;
                } else {
                    html += '<td></td>';
                }
            }

            html += '</tr>';
        }

        html += '</tbody></table>';
        calendarContainer.innerHTML = html;

        // Add event listeners to dates
        calendarContainer.addEventListener('click', async (event) => {
            if (event.target.tagName === 'TD' && !event.target.classList.contains('greyed')) {
                const date = event.target.dataset.date;
                if (selectedDates.includes(date)) {
                    event.target.style.backgroundColor = 'red';
                    selectedDates = selectedDates.filter(d => d !== date);
                } else {
                    event.target.style.backgroundColor = 'green';
                    selectedDates.push(date);
                }
                await saveUserSelections(selectedDates); // Save selections after updating
            }
        });

        loadUserSelections();
    }

    function getMonthName(month) {
        const months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
        return months[month];
    }

    async function loadUserSelections() {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch('/calendar', {
                headers: { 'x-user-id': userId }
            });
            const data = await response.json();
            // Process the data
        } catch (error) {
            console.error('Error loading user selections:', error);
        }
    }
    
    async function saveUserSelections(selections) {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch('/calendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId
                },
                body: JSON.stringify({ userId, selections })
            });
            const result = await response.json();
            // Process the result
        } catch (error) {
            console.error('Error saving user selections:', error);
        }
    }
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    makeAllGreenButton.addEventListener('click', () => {
        if (confirm('Er du sikker på, at du vil gøre alle valgfrie datoer grønne?')) {
            document.querySelectorAll('#calendar td:not(.greyed)').forEach(td => {
                td.style.backgroundColor = 'green';
                const date = td.dataset.date;
                if (!selectedDates.includes(date)) {
                    selectedDates.push(date);
                }
            });
        }
    });

    makeAllRedButton.addEventListener('click', () => {
        if (confirm('Er du sikker på, at du vil gøre alle valgfrie datoer røde?')) {
            document.querySelectorAll('#calendar td:not(.greyed)').forEach(td => {
                td.style.backgroundColor = 'red';
                const date = td.dataset.date;
                if (selectedDates.includes(date)) {
                    selectedDates = selectedDates.filter(d => d !== date);
                }
            });
        }
    });

    confirmChangesButton.addEventListener('click', async () => {
        try {
            await fetch('/calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selections: selectedDates })
            });
            alert('Ændringer gemt!');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    });

    logoutButton.addEventListener('click', () => {
        fetch('/logout').then(() => {
            localStorage.removeItem('userId');
            window.location.href = 'login.html'; // Redirect to login
        });
    });

    renderCalendar(); // Initial call to render the calendar
});
