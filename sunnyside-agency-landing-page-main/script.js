const menuIcon = document.querySelector('.menu-icon button');
const navLinks = document.querySelector('.nav-links');


menuIcon.addEventListener('click',()=>{
    navLinks.classList.toggle('hidden')
});

// to display navigation links for larger screen size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 600) {
        navLinks.classList.remove('hidden');
    }
});
