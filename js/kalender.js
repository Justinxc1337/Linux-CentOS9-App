document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const selectAllYesButton = document.getElementById("selectAllYes");
    const selectAllNoButton = document.getElementById("selectAllNo");
    const totalYes = document.getElementById("totalYes");
    const totalNo = document.getElementById("totalNo");

    const year = new Date().getFullYear();
    const weekdays = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag"];
    const weekendDays = ["lørdag", "søndag"];
    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
    let yesCount = 0;
    let noCount = 0;

    // Create days for each month
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthElement = document.createElement("div");
        monthElement.classList.add("month");
        monthElement.textContent = monthNames[month];
        calendar.appendChild(monthElement);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.toLocaleDateString('da-DK', { weekday: 'long' });

            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.dataset.date = date.toISOString().split('T')[0]; // Store date as data attribute

            const dayNumberElement = document.createElement("div");
            dayNumberElement.classList.add("day-number");
            dayNumberElement.textContent = day;

            dayElement.appendChild(dayNumberElement);

            if (weekdays.includes(dayOfWeek)) {
                dayElement.classList.add("blue"); // Default to No (blue)
                dayElement.addEventListener("click", () => toggleDay(dayElement));
            } else if (weekendDays.includes(dayOfWeek)) {
                dayElement.classList.add("grey");
            }

            calendar.appendChild(dayElement);
        }
    }

    updateCounts();

    selectAllYesButton.addEventListener("click", () => setAllDays("red"));
    selectAllNoButton.addEventListener("click", () => setAllDays("blue"));

    function toggleDay(dayElement) {
        if (dayElement.classList.contains("grey")) return; // Don't toggle grey days

        if (dayElement.classList.contains("red")) {
            dayElement.classList.remove("red");
            dayElement.classList.add("blue");
        } else {
            dayElement.classList.remove("blue");
            dayElement.classList.add("red");
        }
        updateCounts();
    }

    function setAllDays(color) {
        const days = document.querySelectorAll(".day:not(.grey)");
        days.forEach(day => {
            day.classList.remove("red", "blue");
            day.classList.add(color);
        });
        updateCounts();
    }

    function updateCounts() {
        yesCount = document.querySelectorAll(".day.red").length;
        noCount = document.querySelectorAll(".day.blue").length;
        totalYes.textContent = yesCount;
        totalNo.textContent = noCount;
    }
});
