const input = document.querySelectorAll('.input-item');
const calculate = document.querySelector('.arrow-wrapper');
const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const day = document.querySelector('.day-input');
const month = document.querySelector('.month-input');
const year = document.querySelector('.year-input');

function setError(input, errorMsg) {
    input.classList.add('error');
    input.children[2].innerText = errorMsg;
}

function removeError(input) {
    input.classList.remove('error');
    input.children[2].innerText = "";
}

function validateEmpty(input) {
    if(input.children[1].value === "") {
        setError(input, "This field is required");
    } else {
        removeError(input);
    }
}

function validateDay(day, month, year) {
    const currentDay = day.children[1].value;
    const currentMonth = month.children[1].value;
    const currentYear = year.children[1].value;

    if(currentDay < 1 || currentDay > 31) {
        setError(day, "Must be a valid day");
    } else if(currentMonth === 1 || currentMonth > 2) {
        if(currentDay > dayInMonth[currentMonth - 1]) {
            setError(day, "Must be a valid day");
        }
    } else if (currentMonth == 2) {
        let leapYear = false;
        if ((!(currentYear % 4) && currentYear % 100) || !(currentYear % 400)) {
            leapYear = true;
        } 

        if ((!leapYear && (currentDay >= 29)) || (leapYear && (currentDay > 29))) {
            setError(day, "Must be a valid day");
        }
    } else {
        removeError(day);
    }
}

function validateMonth(month) {
    const thisMonth = month.children[1].value;
    if(thisMonth < 1 || thisMonth > 12) {
        setError(month, "Must be a valid month");
    }
}

function validateYear(year, month, day) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    
    if(year.children[1].value > currentYear) {
        setError(year, "Must be in the past");
    } else if(month.children[1].value > currentMonth) {
        setError(month, "Must be in the past");
    } else if(month.children[1].value === currentMonth && day.children[1].value > currentDay) {
        setError(day, "Must be in the past");
    }
}

calculate.addEventListener('click', () => {
    input.forEach(element => {
        validateEmpty(element);
    });

    validateDay(day, month, year);
    validateMonth(month);
    validateYear(year, month, day);
});

