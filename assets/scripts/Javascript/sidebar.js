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
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("blogSidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sidebar.classList.toggle("open");
            
            // Swap button visuals dynamically depending on states
            if (sidebar.classList.contains("open")) {
                toggleBtn.textContent = "❌ Close";
            } else {
                toggleBtn.textContent = "📂 Entries";
            }
        });

        // Close sidebar if user clicks anywhere outside of the drawer area
        document.addEventListener("click", function (e) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("open");
                toggleBtn.textContent = "📂 Entries";
            }
        });
    }
});