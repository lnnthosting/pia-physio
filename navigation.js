const menuToggle = document.querySelector('.menu-toggle');
const navList = document.getElementById('navList');

function closeMenu() {
    navList.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menü öffnen');
    document.querySelectorAll('.dropdown.open').forEach((dropdown) => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
}

function toggleMenu() {
    const isOpen = navList.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
}

menuToggle.addEventListener('click', toggleMenu);

document.querySelectorAll('.dropdown').forEach((dropdown) => {
    const link = dropdown.querySelector('.nav-link');
    const arrow = link.querySelector('.dropdown-arrow');
    const toggle = document.createElement('button');

    arrow.setAttribute('aria-hidden', 'true');
    toggle.type = 'button';
    toggle.className = 'dropdown-toggle';
    const label = link.textContent.replace('▼', '').trim();
    toggle.setAttribute('aria-label', `Untermenü für ${label} öffnen`);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span aria-hidden="true">⌄</span>';
    link.after(toggle);

    toggle.addEventListener('click', () => {
        const willOpen = !dropdown.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach((otherDropdown) => {
            otherDropdown.classList.remove('open');
            otherDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
        dropdown.classList.toggle('open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
        toggle.setAttribute('aria-label', `Untermenü für ${label} ${willOpen ? 'schließen' : 'öffnen'}`);
    });
});

document.querySelectorAll('.nav-list a').forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});
