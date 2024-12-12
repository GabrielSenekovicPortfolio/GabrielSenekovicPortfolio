document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.year-toggle').forEach(year => {
        year.addEventListener('click', () => {
            const monthList = year.nextElementSibling;
            console.log('Toggling year:', year.textContent); // Debug
            monthList.classList.toggle('show');
        });
    });

    document.querySelectorAll('.month-toggle').forEach(month => {
        month.addEventListener('click', () => {
            const postList = month.nextElementSibling;
            console.log('Toggling month:', month.textContent); // Debug
            postList.classList.toggle('show');
        });
    });
});