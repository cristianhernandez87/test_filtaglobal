export function captureLinks() {
    console.log('captureLinks');
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Link clicked');
        });
    });
}