document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbarLinks = document.getElementById('navbar-links');
    const dropdowns = document.querySelectorAll('.navbar-links .dropdown');

    // Toggle hamburger menu
    hamburgerMenu.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
    });

    // Toggle dropdowns on smaller screens
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a'); // The main link for the dropdown
        if (window.innerWidth <= 900) { // Apply only for screens less than or equal to 900px
            dropdownToggle.addEventListener('click', function(e) {
                // Prevent default link behavior if it's a dropdown toggle
                // but only if it's not the contact button or a direct link
                if (!e.target.classList.contains('contact-btn') && !e.target.closest('.dropdown-content a')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close navbar and dropdowns if clicking outside (optional)
    document.addEventListener('click', function(event) {
        if (!navbarLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            navbarLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Handle window resize to reset menu state
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navbarLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});