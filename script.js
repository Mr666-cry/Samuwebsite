document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA UNTUK THEME SWITCHER ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        // Atur tema default jika tidak ada yang tersimpan
        body.setAttribute('data-theme', 'dark');
    }

    // Tambahkan event listener untuk tombol
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- LOGIKA UNTUK SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});