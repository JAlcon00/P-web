function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const icon = document.getElementById('darkModeIcon');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-brightness-high');
    } else {
        icon.classList.remove('bi-brightness-high');
        icon.classList.add('bi-moon-stars');
    }

}